<?php

namespace App\Controller;

use App\Entity\LastMsgPerGroup;
use App\Entity\UdCall;
use App\Entity\CallStatus;
use App\Entity\Message;
use App\Entity\WaGroup;
use App\Repository\MessageRepository;
use ProxyManager\ProxyGenerator\LazyLoadingGhost\MethodGenerator\CallInitializer;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Encoder\XmlEncoder;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;
use Symfony\Bridge\Monolog\Logger;

class CallController extends AbstractController
{


    /**
     * @Route("call/registerCall", name="UdCall", methods={"POST"})
     */
    public function registerCall(Request $request){
        // getting body data
        $data = json_decode($request->getContent(), true);
        // creating call object with body data
        try{
            $msg_id = $data['msg_id'];
            $ud_call = $this->getIDByVariable(null,$msg_id,'call');
            if ($ud_call != 'no_entity_found')  return new JsonResponse(array("message"=>"this call is already registered"));
            $call = new UdCall();
            $call->setReciever($data['receiver']);
            $call->setIssueId($data['issue_id']);
            $call->setSenderId($data['sender_id']);
            $call->setOriginalMsgId($msg_id);
            $groupId = $this->getIDByVariable($data['group_creation_time'],$data['group_name'],'group');
            $call->setGroupId($groupId);
            $call->setDescription($data['description']);
            $call->setStatus($data['status']);
            $call->setRegisterTime(($data['register_time']));
            $call->setLastUpdate($data['last_update']);

            $entityManager = $this->getDoctrine()->getManager();
            // tell Doctrine you want to (eventually) save the call (no queries yet)
            $entityManager->persist($call);
            // actually executes the queries (i.e. the INSERT query)
            $entityManager->flush();

        }catch (\Error $e) {
            return $this->json(array("error" => $e->getMessage()), 400);
        }
        //getting call_id
         $call_id = $call->getCallId();
        if($call_id > 0){
            // updating other relevant tables
            $this->updateStatusTable($call_id,$data['status'],$data['register_time']);
            $res = $this->updateMassageTable($call_id,$data['description'],$data['register_time'],$data['group_name'],$data['group_creation_time'],$data['msg_id'],$data['reference_msg_id'],$data['sender_id']);


        } else {
            return new JsonResponse(array("error" => "an error has occurred"));
        }
        $data['groupId'] = $res;
        $data['msg'] = $data['description'];
        $data['timestamp'] = $data['register_time'];
        unset ($data['description']);
        unset ($data['route']);
        unset ($data['call_type_id']);
        unset ($data['issue_id']);
        unset ($data['group_name']);
        unset ($data['status']);
        unset ($data['register_time']);
        unset ($data['last_update']);
        unset ($data['reference_msg_id']);
        unset ($data['group_creation_time']);
        return new JsonResponse(array("new_message"=>$data));

    }
    /**
     * @Route("call/status", name="status", methods={"POST"})
     */
    public function updateStatus(Request $request){
    //    global $kernel;
        /**
         * @var $logger Logger
         */
     //   $logger = $kernel->getContainer()->get('logger');
        
        // getting body data
        $data = json_decode($request->getContent(), true);
     //   $logger->info(sprintf('data: %s', $data));
        if(gettype($data['sender_id']) == 'string' && gettype($data['group_name']) == 'string' && gettype($data['msg']) == 'string' && gettype($data['msg_id']) == 'string' && gettype($data['reference_msg_id']) == 'string'){
           $call_id = $this->getIDByVariable(null,$data['reference_msg_id'],'call');
           if ($call_id == 'no_entity_found')  return new JsonResponse(array("error" => "no reference found"));
           //$groupId = $this->getIDByVariable($data['group_creation_time'],$data['group_name'],'group');
           $this->updateStatusTable($call_id,$data['status'],$data['timestamp']);
           $res = $this->updateMassageTable( $call_id,$data['msg'],$data['timestamp'],$data['group_name'],$data['group_creation_time'],$data['msg_id'],$data['reference_msg_id'],$data['sender_id']);
        } else{
            return new JsonResponse(array("error" => "invalid argument"));
         }

        $data['groupId'] = $res;
        unset ($data['route']);
        unset ($data['group_name']);
        unset ($data['status']);
        unset ($data['reference_msg_id']);
        unset ($data['group_creation_time']);
        return new JsonResponse(array("new_message"=>$data));
    }

    /**
     * @Route("call/message", name="message", methods={"POST"})
     */
    public function registerMessage(Request $request){
        // getting body data
        $data = json_decode(
            $request->getContent(),
            true
        );
        if(gettype($data['route'] == 'string') && gettype($data['sender_id'] == 'string') && gettype($data['timestamp'] == 'integer') && $data['msg_id'] !=null && $data['msg_id'] !=''){
          $res = $this->updateMassageTable(null,$data['msg'],$data['timestamp'],$data['group_name'],$data['group_creation_time'],$data['msg_id'],$data['reference_msg_id'],$data['sender_id']);
          if (gettype($res) != 'integer')  return new JsonResponse(array("error"=>$res));
        } else {
            return new JsonResponse(array("error" => "invalid argument"));
        }
        $data['groupId']= $res;
        unset($data['route']);
        unset($data['group_name']);
        unset($data['group_creation_time']);
        unset($data['reference_msg_id']);
        return new JsonResponse(array("new_message"=>$data));
    }

    /**
     * @Route("call/updateGroupName", name="updateGroupName", methods={"POST"})
     */
    public function updateGroupName(Request $request){
        // getting body data
        $data = json_decode($request->getContent(), true);
        if(gettype($data['old']) == 'string' && gettype($data['new']) == 'string' && gettype($data['created_time']) == 'string'){
           $grp = $this->updateGName($data['old'],$data['new'],$data['created_time']);
            if ($grp == 'no_entity_found')  return new JsonResponse(array("error"=>"no such group found"));
        } else {
            return new JsonResponse(array("error" => "invalid argument"));
        }
        return new JsonResponse(array("message"=>"group name updated successfully"));

    }

    /**
     * @Route("call/getLastMsg", name="getLastMsg", methods={"POST"})
     */
    public function getLastMsg(Request $request){
        $data = json_decode($request->getContent(), true);
        $groupid = $this->getIDByVariable($data['group_creation_time'],$data['group'],'group');
        if ($groupid == 'no_entity_found')  return new JsonResponse(array("error"=>"no such group found"));
        $last_message_id = $this->getIDByVariable(null,$groupid,'lastMsg');
        $last_message_data = $this->getIDByVariable(null,$last_message_id,'msg');

        if(sizeof($last_message_data) > 0){
            return new JsonResponse(array("last_message"=>$last_message_data));
        }else {
            return new JsonResponse(array("error"=>"something went wrong"));
        }

    }

    private function updateGName($old,$new,$created_time){
        try{
            $group = $this->getDoctrine()->getRepository(WaGroup::class)->findOneBy(['groupName'=>$old,'createdTime'=>$created_time]);
            if ($group == null) return 'no_entity_found';
            $group->setGroupName($new);
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($group);
            $entityManager->flush();
        }catch (\Error $e) {
            return $this->json(array("error" => $e->getMessage()), 400);
        }
        return null;
    }

    private function updateStatusTable($call_id,$status,$timestamp){
            $callStatus = new CallStatus();
            $callStatus->setCallId($call_id);
            $status = $this->getEnglishStatus($status);
            $callStatus->setStatus($status);
            $callStatus->setTimestamp($timestamp);
            $entityManager = $this->getDoctrine()->getManager();
            $entityManager->persist($callStatus);
            $entityManager->flush();
            $this->updateCallStatus($call_id,$status);
    }

    private function getEnglishStatus ($status){
        if ($status == 'בוצע') $status = 'closed';
        if ($status == 'בטיפול') $status = 'on_progress';
        if ($status == 'אעדכן מחר') $status = 'update ahead';
        return $status;
    }

    private function updateMassageTable($call_id,$description,$register_time,$group_name,$group_creation_time,$msg_id,$reference_msg_id,$sender_id){
            try{
                $msg = new Message();
                $msg->setCallId($call_id);
                $msg->setMsg($description);
                $msg->setSenderId($sender_id);
                $msg->setMsgId($msg_id);
                $msg->setTimestamp($register_time);
                $groupId = $this->getIDByVariable($group_creation_time,$group_name,'group');
                if($groupId == 'no_entity_found') return "this message was not registered. please make sure the whatsApp group is registered first";
                $msg->setGroupId($groupId);
                $msg->setReferenceMsgId($reference_msg_id);
                $entityManager = $this->getDoctrine()->getManager();
                $entityManager->persist($msg);
                $entityManager->flush();
                $messag_Table_id = $msg->getRowId();
                $this->updateLastMsgTable($groupId,$messag_Table_id);
            }catch  (\Error $e) {
                return new JsonResponse (array("error" => $e->getMessage()));
            }

          return $groupId;
     }

    private function updateLastMsgTable($grp_id,$msg_id){
        $lastMsg = $this->getDoctrine()->getRepository(LastMsgPerGroup::class)->findOneBy(['groupId'=>$grp_id]);
        $lastMsg->setMsgid($msg_id);
        $entityManager = $this->getDoctrine()->getManager();
        $entityManager->persist($lastMsg);
        $entityManager->flush();

    }

    private function getIDByVariable($var_a,$var_b,$object){
        switch ($object){
            case 'call':
                $obj = UdCall::class;
                $searchBy = ['originalMsgId'=>$var_b];
            break;
            case 'group':
                $obj = WaGroup::class;
                $searchBy = ['groupName'=>$var_b,'createdTime'=>$var_a];
            break;
            case 'lastMsg':
                $obj = LastMsgPerGroup::class;
                $searchBy = ['groupId'=>$var_b];
            break;
            case 'msg':
                $obj = Message::class;
                $searchBy = ['rowId'=>$var_b];
            break;
        }
        $entity = $this->getDoctrine()->getRepository($obj)->findOneBy($searchBy);
        if ($entity != null){
            if($object == 'call') return  $entity->getCallId();
            if($object == 'group') return  $entity->getGroupId();
            if($object == 'lastMsg') return  $entity->getMsgid();
            if($object == 'msg') return  array("message"=>$entity->getMsg(),"Sender_id"=>$entity->getSenderId(),"timestamp"=>$entity->getTimestamp(),"msg_id"=>$entity->getMsgId());
        } else return 'no_entity_found';


    }

    private function updateCallStatus($call_id,$status){
        $entityManager = $this->getDoctrine()->getManager();
        $call = $entityManager->getRepository(UdCall::class)->find($call_id);
        if (!$call) {
            return;
        }
        $call->setStatus($status);
        $entityManager->flush();
    }
}
