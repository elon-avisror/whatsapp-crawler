<?php
/**
 * Created by PhpStorm.
 * User: אייל נעמן
 * Date: 28/10/2018
 * Time: 15:53
 */

namespace App\Controller;

use App\Entity\CallType;
use App\Entity\Customer;
use App\Entity\CustomerTag;
use App\Entity\Issue;
use App\Entity\CallStatus;
use App\Entity\DataValidated;
use App\Entity\GroupsTagtablesRelations;
use App\Entity\Message;
use App\Entity\SubIssueTag;
use App\Entity\SubIssue;
use App\Entity\User;
use App\Entity\Tags;
use App\Entity\WaGroup;
use App\Entity\Validationlinks;
use App\Repository\TagsRepository;
use App\Repository\CustomerTagRepository;
use App\Repository\ValidationLinkRepository;
use App\Repository\DataValidatedRepository;
use Proxies\__CG__\App\Entity\UdCall;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

class AdminController extends AbstractController
{
    /**
     * @Route("admin/getWAGroups", name="getWAGroups", methods={"POST"})
     */
    public function getWAGroups(Request $request)
    {
        $data = json_decode($request->getContent(), true);
        $entity_table = $this->getDoctrine()->getRepository(WaGroup::class)->findAll();
        $encoders = array(new XmlEncoder(), new JsonEncoder());
        $normalizers = array(new ObjectNormalizer());
        $serializer = new Serializer($normalizers, $encoders);
        $jsonContent = $serializer->serialize($entity_table, 'json');
        return new JsonResponse(json_decode($jsonContent));
    }



    /**
     * @Route("admin/getValidated_data", name="getValidated_data", methods={"POST"})
     */
    public function getValidated_data(Request $request)
    {
        $data = json_decode($request->getContent(), true);
        $since = $data['since'];
        $until = $data['until'];
        $group_name = $data['group_name'];
        /**
         * @var $DataValidatedRepository DataValidatedRepository
         */
        try {
            $group = $this->getObjectByData(WaGroup::class, ['groupName' => $group_name]);
            if ($group == 'no_entity_found') return new JsonResponse(array('message' => $group));
            $DataValidatedRepository = $this->getDoctrine()->getRepository(DataValidated::class);
            $ValidatedData = $DataValidatedRepository->getValidatedData($since, $until, $group->getGroupId());
            $encoders = array(new XmlEncoder(), new JsonEncoder());
            $normalizers = array(new ObjectNormalizer());
            $serializer = new Serializer($normalizers, $encoders);
            $ValidatedData = $serializer->serialize($ValidatedData, 'json');
            $ValidatedData = $this->collectValidatedData(json_decode($ValidatedData));
        } catch (\Error $e) {
            return new JsonResponse(array("error" => $e->getMessage()));
        }
        return new JsonResponse(array('validated_data' => $ValidatedData));
    }

    private function collectValidatedData($ValidatedData)
    {
        $data = array();
        foreach ($ValidatedData as $vd) {
            $text = '';
            $sender = '';
            $time = '';
            $group = '';
            $issue = '';
            $sub_issus = '';
            $customer = '';
            $status = '';
            $receiver = '';
            $receiver = $vd->receiver;
            $sender = $vd->senderId;
            $call = $this->getObjectByData(UdCall::class, ['originalMsgId' => $vd->msgId]);
            if ($call == 'no_entity_found') continue;
            $status = $call->getStatus();
            $customer = $this->getObjectByData(Customer::class, ['id' => $vd->customer]);
            if ($customer == 'no_entity_found') continue;
            $customer = $customer->getName();
            $issue = $this->getObjectByData(Issue::class, ['issueId' => $vd->issue]);
            if ($issue == 'no_entity_found') continue;
            $issue = $issue->getDescription();
            $group = $this->getObjectByData(WaGroup::class, ['groupId' => $vd->groupId]);
            if ($group == 'no_entity_found') continue;
            $group = $group->getGroupName();
            $sub_issus_array = json_decode($vd->subIssue);
            $space = '';
            foreach ($sub_issus_array as $si) {
                if (strlen($sub_issus) > 0) $space = ', ';
                $Sub_i = $this->getObjectByData(SubIssue::class, ['id' => $si]);
                $sub_issus = $sub_issus . $space . $Sub_i->getName();
            }
            $msg = $this->getObjectByData(Message::class, ['msgId' => $vd->msgId]);
            $text = $msg->getMsg();
            $time = $msg->getTimestamp();
            $time = ((int)$time) / 1000;
            $time = date('d-m-Y H:i', $time);
            $data[] = array('text' => $text, 'sender' => $sender, 'time' => $time, 'group' => $group, 'issue' => $issue, 'sub_issus' => $sub_issus, 'receiver' => $receiver, 'customer' => $customer, 'status' => $status);
        }
        return $data;
    }

    /**
     * @Route("admin/Data_Validated", name="Data_Validated", methods={"POST"})
     */
    public function Data_Validated(Request $request)
    {
        $data = json_decode($request->getContent(), true);
        try {
            //check if already validated
            $msg_id = $data['msg_id'];
            $valdationLink = $this->getObjectByData(Validationlinks::class, ['msgId' => $msg_id]);
            if ($valdationLink->getStatus() == true) return new JsonResponse(array('message' => 'data already validated before'));
            // insert data into Data_Validated in the data base
            $entityManager = $this->getDoctrine()->getManager();
            $data_validated = new DataValidated();
            $data_validated->setIssue($data['issue_id']);
            $data_validated->setStatus('opened');
            $data_validated->setLastUpdate($data['ts']);
            $data_validated->setReceiver($data['receiver']);
            $data_validated->setMsgId($data['msg_id']);
            $data_validated->setCustomer($data['customer']);
            $data_validated->setSubIssue(json_encode($data['sub_issue']));
            $data_validated->setSenderId($data['sender_id']);
            $data_validated->setGroupId($data['group_id']);
            $entityManager->persist($data_validated);
            $entityManager->flush();
            $this->updateReleventTables($data['msg_id'], 'opened', $data['ts']);
        } catch (\Error $e) {
            return new JsonResponse(array("error:" => $e->getMessage()));
        }

        return new JsonResponse(array('message' => 'validated data registered'));
    }

    private function updateReleventTables($msg_id, $status, $ts)
    {
        try {
            // update UdCall table
            $repository = $this->getDoctrine()->getRepository(UdCall::class);
            $call = $repository->findOneBy(['originalMsgId' => $msg_id]);
            $call_id = $call->getCallId();
            if ($call == null) return 'no_entity_found';
            $call->setStatus($status);
            $call->setLastUpdate($ts);
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($call);
            $entityManager->flush();
            // update CallStatus table
            $callStatus = new CallStatus();
            $callStatus->setCallId($call_id);
            $callStatus->setStatus($status);
            $callStatus->setTimestamp($ts);
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($callStatus);
            $entityManager->flush();
            // update Validationlinks table
            $repository = $this->getDoctrine()->getRepository(Validationlinks::class);
            $Validationlink = $repository->findOneBy(['msgId' => $msg_id]);
            $Validationlink->setStatus(true);
            $current_time = strtotime("now") * 1000;
            $Validationlink->setSent($current_time);
            $entityManager->persist($Validationlink);
            $entityManager->flush();
        } catch (\Error $e) {
            return $this->json(array("error" => $e->getMessage()), 400);
        }
    }

    /**
     * @Route("admin/validateTag", name="validateTag", methods={"POST"})
     */
    public function validateTag(Request $request)
    {
        $data = json_decode($request->getContent(), true);
        $sender_id = null;
        $customer = array();
        $issue = array();
        $sub_issue = array();
        $receiver = null;
        $group = null;
        $msg_text = null;
        $ts = null;
        $msg_id = $data['msg_id'];
        $call = $this->getObjectByData(UdCall::class, ['originalMsgId' => $msg_id]);
        if ($call == 'no_entity_found')   return new JsonResponse(array("error" => "group not found"));
        //get issue
        $issue = $this->getObjectByData(Issue::class, ['issueId' => $call->getIssueId()]);
        $issue = array('description' => $issue->getDescription(), 'id' => $issue->getIssueId());
        $msg_text = $call->getDescription();
        $receiver = $call->getReciever();
        $ts = $call->getRegisterTime();
        $sender_id = $call->getSenderId();
        $groupData = $this->getObjectByData(WaGroup::class, ['groupId' => $call->getGroupId()]);
        $groupName = $groupData->getGroupName();
        $groupConfirmationTel = $groupData->getConfirmationTel();
        $groupId = $groupData->getGroupId();
        //get tags
        $tagsRepository = $this->getDoctrine()->getRepository(Tags::class);
        $tags = $tagsRepository->findBy(['msgId' => $msg_id]);
        if (sizeof($tags) > 0) {
            $probability = 0;
            foreach ($tags as $tag) {
                $tag_type = $tag->getTagType();
                if ($tag_type == 'customer') {
                    if ($probability < $tag->getProbability()) {
                        $customer = array();
                        $probability = $tag->getProbability();
                        $class = Customer::class;
                        $main_tag = $this->getObjectByData($class, ['id' => $tag->getTag()]);
                        $customer[] = array('name' => $main_tag->getName(), 'id' => $main_tag->getId());
                    }
                }
                if ($tag_type == 'sub_issue') {
                    $class = SubIssue::class;
                    $main_tag = $this->getObjectByData($class, ['id' => $tag->getTag()]);
                    $sub_issue[] = array('name' => $main_tag->getName(), 'id' => $main_tag->getId());
                }
            }
            if (sizeof($sub_issue) < 1) {
                $other_id = $this->getObjectByData(SubIssue::class, ['name' => 'אחר']);
                $sub_issue[] = array('name' => $other_id->getName(), 'id' => $other_id->getId());
            };
        }
        $data_to_validate = array(
            'sender_id' => $sender_id, 'customer' => $customer, 'issue' => $issue, 'sub_issue' => $sub_issue,
            'receiver' => $receiver, 'group_name' => $groupName, 'group_id' => $groupId, 'msg_text' => $msg_text, 'msg_id' => $msg_id, 'timestamp' => $ts
        );
        $this->createValidationLink($data_to_validate, $groupConfirmationTel);
        return new JsonResponse(array("validation_link_created" => $data_to_validate));
    }

    /**
     * @Route("admin/getValidationLinks", name="getValidationLinks", methods={"POST"})
     */
    public function getValidationLinks(Request $request)
    {
        /**
         * @var $ValidationLinkRepository ValidationLinkRepository
         */
        try {
            $ValidationlinksRepository = $this->getDoctrine()->getRepository(Validationlinks::class);
            $links = $ValidationlinksRepository->getValLink();
            $encoders = array(new XmlEncoder(), new JsonEncoder());
            $normalizers = array(new ObjectNormalizer());
            $serializer = new Serializer($normalizers, $encoders);
            $links = $serializer->serialize($links, 'json');
            if ($links != "[]") {
                $this->updateValidationLinks(json_decode($links));
            }
        } catch (\Error $e) {
            return $this->json(array("error" => $e->getMessage()), 400);
        }

        return new JsonResponse(json_decode($links));
    }

    private function updateValidationLinks($links)
    {
        foreach ($links as $link) {
            $entityManager = $this->getDoctrine()->getManager();
            $validLink = $entityManager->getRepository(Validationlinks::class)->find($link->linkid);
            $current_time = strtotime("now") * 1000;
            $validLink->setSent($current_time);
            $entityManager->flush();
        }
    }

    /**
     * @Route("admin/getDataToValidateByMsgId", name="getDataToValidateByMsgId", methods={"POST"})
     */
    public function getDataToValidateByMsgId(Request $request)
    {
        $data = json_decode($request->getContent(), true);
        $msg_id = $data['msg_id'];
        $link = $this->getObjectByData(Validationlinks::class, ['msgId' => $msg_id]);
        if ($link == 'no_entity_found')  return new JsonResponse(array('error' => 'no such link found'));
        $dataToValidate = $link->getDatatovalidate();
        $dataToValidate = json_decode($dataToValidate);
        return new JsonResponse(array('data_to_validate' => $dataToValidate));
    }


    private function createValidationLink($data, $groupConfirmationTel)
    {
        $link = getenv('URLROOT');
        $send_to =  getenv('SEND_TO');
        $send_to_admin =  getenv('SEND_TO_ADMIN');
        $send_to_group_manager = getenv('SEND_TO_GROUP_MANAGER');
        if ($send_to_admin !== "true")  $send_to = $data['sender_id'];
        //getting group manager phone number for confirmation
        if ($groupConfirmationTel != null)  $send_to = $groupConfirmationTel;



        $msg_id = $data['msg_id'];
        $data = json_encode($data);
        $link = $link . 'assets/views/validate.html?data=' . $msg_id;
        try {
            $validationlink_Manager = $this->getDoctrine()->getManager();
            $Validationlinks = new Validationlinks();
            $Validationlinks->setLink($link);
            $Validationlinks->setSendto($send_to); // from config(.env)
            $Validationlinks->setSent(0);
            $Validationlinks->setStatus(false); //<---------
            $timestamp = strtotime("now") * 1000;
            $Validationlinks->setTimestamp($timestamp);
            $Validationlinks->setMsgId($msg_id);
            $Validationlinks->setDatatovalidate($data);
            $validationlink_Manager->persist($Validationlinks);
            $validationlink_Manager->flush();
        } catch (\Error $e) {
            return new JsonResponse(array("error" => $e->getMessage()));
        }
        return $link;
    }

    /**
     * @Route("admin/parseSCV", name="parseSCV", methods={"POST"})
     */
    public function parseSCV()
    {
        try {
            $feed = dirname(dirname(__FILE__)) . '/data/client2.csv';
            $data = $this->csvToArray($feed, ',');
        } catch (\Error $e) {
            return new JsonResponse(array("error:" => $e->getMessage()));
        }
        $arr = array();
        $size = sizeof($data);
        foreach ($data as $row) {
            if ($row[1] != '') continue;
            $arr[$row[0]] = $row[0];
        }
        $this->insertIntoCustomerDB($arr);
        return new JsonResponse($arr);
        //
        // $this->insertIntoCustomerTagDB($row,$c);
    }

    function insertIntoCustomerDB($arr)
    {
        foreach ($arr as $k) {
            $entityManager = $this->getDoctrine()->getManager();
            $Customer = new Customer();
            $Customer->setName($k);
            $entityManager->persist($Customer);
            $entityManager->flush();
        }
    }

    function insertIntoCustomerTagDB($row, $c)
    {
        try {
            $entityManager = $this->getDoctrine()->getManager();
            $CustomerTag = new CustomerTag();
            $tag_id = $this->getCustomerIdByName($row[0]);
            $CustomerTag->setTag($tag_id);
            $CustomerTag->setWord($row[1]);
            $CustomerTag->setProbability($row[2]);
            $entityManager->persist($CustomerTag);
            $entityManager->flush();
        } catch (\Error $e) {
            return new JsonResponse(array("error:" . $c => $e->getMessage()));
        }
    }

    function getTagIdByName($name, $class)
    {
        if ($class == 'customer' || $class == 'לקוח') $class = Customer::class;
        if ($class == 'sub_issue') $class = SubIssue::class;
        $entity = $this->getDoctrine()->getRepository($class)->findOneBy(['name' => $name]);
        return  $entity->getId();
    }

    function csvToArray($file, $delimiter)
    {
        if (($handle = fopen($file, 'r')) !== FALSE) {
            $i = 0;
            while (($lineArray = fgetcsv($handle, 4000, $delimiter, '"')) !== FALSE) {
                for ($j = 0; $j < count($lineArray); $j++) {
                    $arr[$i][$j] = $lineArray[$j];
                }
                $i++;
            }
            fclose($handle);
        }
        return $arr;
    }

    /**
     * @Route("admin/getTablesData", name="getTablesData", methods={"POST"})
     */
    public function getTablesData(Request $request)
    {
        $data = json_decode($request->getContent(), true);
        $tablesToGetFromDB = array("customer_tag", "sub_issue_tag");
        $allTagTables = array();
        try {
            foreach ($tablesToGetFromDB as $table_name) {
                $table = $this->getEntityTable($table_name);
                $content = json_decode($table->getContent());
                $content = $this->addTagsToTable($content, $table_name);

                $associated_groups = $this->getAssociated_groups(GroupsTagtablesRelations::class, ['tagTable' => $table_name]);
                $allTagTables[] = array("table_name" => $table_name, "tags" => $content, "associated_groups" => $associated_groups);
            }
        } catch (\Error $e) {
            return new JsonResponse(array("error" => $e->getMessage()));
        }
        return new JsonResponse($allTagTables);
    }

    private function getAssociated_groups($class, $findBy)
    {
        $associated_groups = $this->getObjectByData($class, $findBy);
        $groupsArr = json_decode($associated_groups->getGroupsAssociated());
        $groupNames = array();
        foreach ($groupsArr as $groupId) {
            $group = $this->getObjectByData(WaGroup::class, ['groupId' => $groupId]);
            $groupNames[] = $group->getGroupName();
        }
        return $groupNames;
    }

    private function addTagsToTable($table, $table_name)
    {
        if ($table_name == "customer_tag") $class = Customer::class;
        if ($table_name == "sub_issue_tag") $class = SubIssue::class;
        $c = 0;
        try {
            foreach ($table as $row) {
                $tag_id = $row->tag;
                $c++;
                $tag = $this->getObjectByData($class, ['id' => $tag_id]);
                if ($tag == 'no_entity_found') {
                    $row->tagName = 'tag_not_found';
                    continue;
                }

                $tag = $tag->getName();
                $row->tagName = $tag;
            }
        } catch (\Error $e) {
            return $this->json(array("error" => $e->getMessage()), 400);
        }

        return $table;
    }

    private function getObjectByData($class, $findby)
    {
        if ($class != null && $findby != null) {
            $entity = $this->getDoctrine()->getRepository($class)->findOneBy($findby);
            if ($entity != null) {
                return  $entity;
            } else return 'no_entity_found';
        }
    }


    /**
     * @Route("admin/getTags", name="getTags", methods={"POST"})
     */
    function getTags(Request $request)
    {

        $data = json_decode($request->getContent(), true);
        $tags = $this->getTagsData($data['ts'], $data['group_name']);
        if ($tags == 'no_entity_found')  return new JsonResponse(array("message" => 'no such group found'));
        return new JsonResponse(array("tags" => $tags));
    }

    private function getTagsData($ts, $group_name)
    {
        /**
         * @var $messageRepository MessageRepository
         */
        try {
            //get group id
            $group = $this->getObjectByData(WaGroup::class, ['groupName' => $group_name]);
            if ($group == 'no_entity_found') return $group;
            $messageRepository = $this->getDoctrine()->getRepository(Message::class);
            $messages = $messageRepository->getMessagesByTS($ts, $group->getGroupId());
            $msg_arr = array();
            foreach ($messages as $message) {
                $msg = $message->getMsg();
                $msg_ig = $message->getMsgId();
                //check if the msg is a call
                $call = $this->getObjectByData(UdCall::class, ['originalMsgId' => $msg_ig]);
                $receiver = '';
                $issue = '';
                $status = '';
                if ($call != 'no_entity_found') {
                    $receiver = $call->getReciever();
                    $status = $call->getStatus();
                    $issueId = $call->getIssueId();
                    $issue = $this->getObjectByData(Issue::class, ['issueId' => $issueId]);
                    $issue = $issue->getDescription();
                } else {
                    $a = 0;
                }
                $groupid = $message->getGroupId();
                $sender_id = $message->getSenderId();
                $timeStamp = $message->getTimestamp();
                $ref_msg_id = $message->getReferenceMsgId();
                $fer_text = '';
                $ref = $this->getObjectByData(Message::class, ['msgId' => $ref_msg_id]);
                if ($ref != 'no_entity_found') {
                    $fer_text = $ref->getMsg();
                }
                $reference = array('ref_txt' => $fer_text, 'ref_msg_id' => $ref_msg_id);
                //get group data
                $groupRepository = $this->getDoctrine()->getRepository(WaGroup::class);
                $group = $groupRepository->find($groupid);
                $groupData = array("group_name" => $group->getGroupName(), "group_creation_time" => $group->getCreatedTime());
                //get tags
                $tagsRepository = $this->getDoctrine()->getRepository(Tags::class);
                $tags = $tagsRepository->findBy(['msgId' => $msg_ig]);

                $tagsData = array();
                foreach ($tags as $tag) {
                    $tagName = '';
                    if ($tag->getTagType() == 'customer') $tagName = $this->getObjectByData(Customer::class, ['id' => $tag->getTag()]);
                    if ($tag->getTagType() == 'sub_issue') $tagName = $this->getObjectByData(SubIssue::class, ['id' => $tag->getTag()]);
                    if ($tagName != "no_entity_found")  $tagName = $tagName->getName();
                    $tagsData[$tag->getTagId()] = array("tag" => $tagName, "tag_Type" => $tag->getTagType(), "text" => $tag->getText(), "probability" => $tag->getProbability());
                }

                $msg_arr[$msg_ig] = array("msg" => $msg, "sender_id" => $sender_id, "receiver" => $receiver, "issue" => $issue, "status" => $status, "reference" => $reference, "timeStamp" => $timeStamp, "groupData" => $groupData, "tags" => $tagsData);
            }
            return $msg_arr;
        } catch (\Error $e) {
            return $this->json(array("error" => $e->getMessage()), 400);
        }
    }

    /**
     * @Route("admin/setTag", name="setTag", methods={"POST"})
     */
    function setTag(Request $request)
    {
        $data = json_decode($request->getContent(), true);
        $msg_id = null;
        try {
            foreach ($data as $d) {
                if ($d == 'admin/setTag') continue;
                $entityManager = $this->getDoctrine()->getManager();
                $tag = new Tags();
                $customer_id = $this->getTagIdByName($d['tag'], $d['tag_type']);
                $tag->setTag($customer_id);
                $msg_id = $d['msg_id'];
                $tag->setMsgId($msg_id);
                $tag->setTagType($d['tag_type']);
                $tag->setProbability($d['probability']);
                $tag->setText($d['text']);
                $tag->setMsg($d['msg']);
                $entityManager->persist($tag);
                $entityManager->flush();
            }
        } catch (\Error $e) {
            return new JsonResponse(array("error" => $e->getMessage()));
        }
        return new JsonResponse(array("message" => "tags added successfully", "msg_id" => $msg_id));
    }
    /**
     * @Route("admin/addEntity", name="addEntity", methods={"POST"})
     */
    function addEntity(Request $request)
    {
        $entityManager = $this->getDoctrine()->getManager();
        $data = json_decode($request->getContent(), true);
        $entity = $data['entity'];
        switch ($entity) {
            case 'issue':
                $response = $this->addIssue($data, $entityManager);
                break;
            case 'user':
                $response = $this->addUser($data, $entityManager);
                break;
            case 'group':
                $response = $this->addGroup($data, $entityManager);
                break;
            case 'customer':
                $response = $this->addCustomer($data, $entityManager);
                break;
            case 'call_type':
                $response = $this->addCall_type($data, $entityManager);
                break;
        }
        return new JsonResponse($response);
    }

    private function addIssue($data, $entityManager)
    {
        try {
            $issue = new Issue();
            $issue->setDescription($data['description']);
            $entityManager->persist($issue);
            $entityManager->flush();
        } catch (\Error $e) {
            return $this->json(array("error" => $e->getMessage()), 400);
        }
        return array("message" => "Issue registered successfully");
    }

    private function addUser($data, $entityManager)
    {
        try {
            $user = new User();
            $user->setUserName($data['user_name']);
            $user->setCategory($data['category']);
            $entityManager->persist($user);
            $entityManager->flush();
        } catch (\Error $e) {
            return $this->json(array("error" => $e->getMessage()), 400);
        }
        return array("message" => "User registered successfully");
    }

    private function addGroup($data, $entityManager)
    {
        try {
            $group = new WaGroup();
            $group->setGroupName($data['group_name']);
            $entityManager->persist($group);
            $entityManager->flush();
        } catch (\Error $e) {
            return $this->json(array("error" => $e->getMessage()), 400);
        }
        return array("message" => "Group registered successfully");
    }

    private function addCustomer($data, $entityManager)
    {
        try {
            $Customer = new Customer();
            $Customer->setCustomerName($data['customer_name']);
            $entityManager->persist($Customer);
            $entityManager->flush();
        } catch (\Error $e) {
            return $this->json(array("error" => $e->getMessage()), 400);
        }
        return array("message" => "customer registered successfully");
    }

    private function addCall_type($data, $entityManager)
    {
        try {
            $call_type = new CallType();
            $call_type->setDescription($data['description']);
            $entityManager->persist($call_type);
            $entityManager->flush();
        } catch (\Error $e) {
            return $this->json(array("error" => $e->getMessage()), 400);
        }
        return array("message" => "call_type registered successfully");
    }

    /**
     * @Route("admin/updateEntity", name="updateEntity", methods={"POST"})
     */
    function updateEntity(Request $request)
    {
        $entityManager = $this->getDoctrine()->getManager();
        $data = json_decode($request->getContent(), true);
        $entity = $data['entity'];
        switch ($entity) {
            case 'user':
                $response = $this->updateUser($data, $entityManager);
                break;
            case 'customer':
                $response = $this->updateCustomer($data, $entityManager);
                break;
            case 'group':
                $response = $this->updateGroup($data, $entityManager);
                break;
            case 'issue':
                $response = $this->updateIssue($data, $entityManager);
                break;
            case 'call_type':
                $response = $this->updateCall_type($data, $entityManager);
                break;
        }
        return new JsonResponse($response);
    }

    private function updateUser($data, $entityManager)
    {
        $user_id = $data['user_id'];
        $user = $entityManager->getRepository(User::class)->find($user_id);
        if (!$user) {
            throw $this->createNotFoundException('No user found for this id ' . $user_id);
        }

        $user->setUserName($data['user_name']);
        $user->setCategory($data['category']);
        $entityManager->flush();
        return array("message" => "user updated successfully");
    }

    private function updateGroup($data, $entityManager)
    {
        $group_id = $data['group_id'];
        $group = $entityManager->getRepository(WaGroup::class)->find($group_id);
        if (!$group) {
            throw $this->createNotFoundException('No group found for this id ' . $group_id);
        }
        $group->setGroupName($data['group_name']);
        $entityManager->flush();
        return array("message" => "user updated successfully");
    }

    private function updateCustomer($data, $entityManager)
    {
        $customer_id = $data['customer_id'];
        $customer = $entityManager->getRepository(Customer::class)->find($customer_id);
        if (!$customer) {
            throw $this->createNotFoundException('No customer found for this id ' . $customer_id);
        }
        $customer->setCustomerName($data['customer_name']);
        $entityManager->flush();
        return array("message" => "customer name updated successfully");
    }

    private function updateIssue($data, $entityManager)
    {
        $issue_id = $data['issue_id'];
        $issue = $entityManager->getRepository(Issue::class)->find($issue_id);
        if (!$issue) {
            throw $this->createNotFoundException('No issue found for this id ' . $issue_id);
        }
        $issue->setDescription($data['description']);
        $entityManager->flush();
        return array("message" => "issue updated successfully");
    }

    private function updateCall_type($data, $entityManager)
    {
        $call_type_id = $data['call_type_id'];
        $call_type = $entityManager->getRepository(CallType::class)->find($call_type_id);
        if (!$call_type) {
            throw $this->createNotFoundException('No issue found for this id ' . $call_type_id);
        }
        $call_type->setDescription($data['description']);
        $entityManager->flush();
        return array("message" => "call_type updated successfully");
    }

    /**
     * @Route("admin/deleteEntity", name="deleteEntity", methods={"POST"})
     */
    function deleteEntity(Request $request)
    {
        $entityManager = $this->getDoctrine()->getManager();
        $data = json_decode($request->getContent(), true);
        $entity = $data['entity'];
        switch ($entity) {
            case 'user':
                $response = $this->deleteUser($data, $entityManager);
                break;
            case 'customer':
                $response = $this->deleteCustomer($data, $entityManager);
                break;
            case 'group':
                $response = $this->deleteGroup($data, $entityManager);
                break;
            case 'issue':
                $response = $this->deleteIssue($data, $entityManager);
                break;
            case 'call_type':
                $response = $this->deleteCall_type($data, $entityManager);
                break;
        }
        return new JsonResponse($response);
    }

    private function deleteUser($data, $entityManager)
    {
        $user_id = $data['user_id'];
        $user = $entityManager->getRepository(User::class)->find($user_id);
        if (!$user) {
            throw $this->createNotFoundException('No user found for this id ' . $user_id);
        }
        $entityManager->remove($user);
        $entityManager->flush();
        return array("message" => "user deleted successfully");
    }

    private function deleteCustomer($data, $entityManager)
    {
        $customer_id = $data['customer_id'];
        $customer = $entityManager->getRepository(Customer::class)->find($customer_id);
        if (!$customer) {
            throw $this->createNotFoundException('No customer found for this id ' . $customer_id);
        }
        $entityManager->remove($customer);
        $entityManager->flush();
        return array("message" => "customer deleted successfully");
    }

    private function deleteGroup($data, $entityManager)
    {
        $group_id = $data['group_id'];
        $group = $entityManager->getRepository(WaGroup::class)->find($group_id);
        if (!$group) {
            throw $this->createNotFoundException('No group found for this id ' . $group_id);
        }
        $entityManager->remove($group);
        $entityManager->flush();
        return array("message" => "group deleted successfully");
    }

    private function deleteIssue($data, $entityManager)
    {
        $issue_id = $data['issue_id'];
        $issue = $entityManager->getRepository(Issue::class)->find($issue_id);
        if (!$issue) {
            throw $this->createNotFoundException('No issue found for this id ' . $issue_id);
        }
        $entityManager->remove($issue);
        $entityManager->flush();
        return array("message" => "issue updated successfully");
    }

    private function deleteCall_type($data, $entityManager)
    {
        $call_type_id = $data['call_type_id'];
        $call_type = $entityManager->getRepository(CallType::class)->find($call_type_id);
        if (!$call_type) {
            throw $this->createNotFoundException('No call_type found for this id ' . $call_type_id);
        }
        $entityManager->remove($call_type);
        $entityManager->flush();
        return array("message" => "call_type deleted successfully");
    }

    /**
     * @Route("admin/getEntity", name="getEntity", methods={"POST"}))
     */
    public function getEntity(Request $request)
    {
        $data = json_decode($request->getContent(), true);
        $entity = $data['entity'];
        $entity =  explode(",", $entity);
        $entities = array();
        foreach ($entity as $ent) {
            switch ($ent) {
                case 'UdCall':
                    $class = UdCall::class;
                    break;
                case 'user':
                    $class = User::class;
                    break;
                case 'customer':
                    $class = Customer::class;
                    break;
                case 'group':
                    $class = WaGroup::class;
                    break;
                case 'issue':
                    $class = Issue::class;
                    break;
                case 'call_type':
                    $class = CallType::class;
                    break;
                case 'customer_tag':
                    $class = customerTag::class;
                    break;
                case 'sub_issue_tag':
                    $class = SubIssueTag::class;
                    break;
                case 'subIssue':
                    $class = SubIssue::class;
                    break;
                case 'groups':
                    $class = WaGroup::class;
                    break;
                default:
                    return new JsonResponse(array("error" => "no such class"));
            }
            $entity_table = $this->getDoctrine()->getRepository($class)->findAll();
            $encoders = array(new XmlEncoder(), new JsonEncoder());
            $normalizers = array(new ObjectNormalizer());
            $serializer = new Serializer($normalizers, $encoders);
            $jsonContent = $serializer->serialize($entity_table, 'json');
            $entities[$ent] = json_decode($jsonContent);
        }


        return new JsonResponse($entities);
    }
    /**
     * @Route("admin/getEntityTable/{entity}")
     */
    public function getEntityTable($entity)
    {
        switch ($entity) {
            case 'UdCall':
                $class = UdCall::class;
                break;
            case 'user':
                $class = User::class;
                break;
            case 'customer':
                $class = Customer::class;
                break;
            case 'group':
                $class = WaGroup::class;
                break;
            case 'issue':
                $class = Issue::class;
                break;
            case 'call_type':
                $class = CallType::class;
                break;
            case 'customer_tag':
                $class = customerTag::class;
                break;
            case 'sub_issue_tag':
                $class = SubIssueTag::class;
                break;
            default:
                return new JsonResponse(array("error" => "no such class"));
        }
        $entity_table = $this->getDoctrine()->getRepository($class)->findAll();
        $encoders = array(new XmlEncoder(), new JsonEncoder());
        $normalizers = array(new ObjectNormalizer());
        $serializer = new Serializer($normalizers, $encoders);
        $jsonContent = $serializer->serialize($entity_table, 'json');
        return new JsonResponse(json_decode($jsonContent));
    }
}
