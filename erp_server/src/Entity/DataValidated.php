<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * DataValidated
 *
 * @ORM\Table(name="data_validated")
 * @ORM\Entity(repositoryClass="App\Repository\DataValidatedRepository")
 */
class DataValidated
{
    /**
     * @var int
     *
     * @ORM\Column(name="row_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $rowId;

    /**
     * @var int|null
     *
     * @ORM\Column(name="issue", type="integer", nullable=true)
     */
    private $issue;

    /**
     * @var string|null
     *
     * @ORM\Column(name="sub_issue", type="string", length=2000, nullable=true)
     */
    private $subIssue;

    /**
     * @var string|null
     *
     * @ORM\Column(name="customer", type="string", length=2000, nullable=true)
     */
    private $customer;

    /**
     * @var string|null
     *
     * @ORM\Column(name="receiver", type="string", length=1000, nullable=true)
     */
    private $receiver;

    /**
     * @var string
     *
     * @ORM\Column(name="status", type="string", length=100, nullable=false)
     */
    private $status;

    /**
     * @var float
     *
     * @ORM\Column(name="last_update", type="float", precision=10, scale=0, nullable=false)
     */
    private $lastUpdate;

    /**
     * @var string
     *
     * @ORM\Column(name="msg_id", type="string", length=2000, nullable=false)
     */
    private $msgId;

    /**
     * @var string
     *
     * @ORM\Column(name="sender_id", type="string", length=200, nullable=false)
     */
    private $senderId;

    /**
     * @var int
     *
     * @ORM\Column(name="group_id", type="integer", nullable=false)
     */
    private $groupId;

    public function getRowId(): ?int
    {
        return $this->rowId;
    }

    public function getIssue(): ?int
    {
        return $this->issue;
    }

    public function setIssue(?int $issue): self
    {
        $this->issue = $issue;

        return $this;
    }

    public function getSubIssue(): ?string
    {
        return $this->subIssue;
    }

    public function setSubIssue(?string $subIssue): self
    {
        $this->subIssue = $subIssue;

        return $this;
    }

    public function getCustomer(): ?string
    {
        return $this->customer;
    }

    public function setCustomer(?string $customer): self
    {
        $this->customer = $customer;

        return $this;
    }

    public function getReceiver(): ?string
    {
        return $this->receiver;
    }

    public function setReceiver(?string $receiver): self
    {
        $this->receiver = $receiver;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getLastUpdate(): ?float
    {
        return $this->lastUpdate;
    }

    public function setLastUpdate(float $lastUpdate): self
    {
        $this->lastUpdate = $lastUpdate;

        return $this;
    }

    public function getMsgId(): ?string
    {
        return $this->msgId;
    }

    public function setMsgId(string $msgId): self
    {
        $this->msgId = $msgId;

        return $this;
    }

    public function getSenderId(): ?string
    {
        return $this->senderId;
    }

    public function setSenderId(string $senderId): self
    {
        $this->senderId = $senderId;

        return $this;
    }

    public function getGroupId(): ?int
    {
        return $this->groupId;
    }

    public function setGroupId(int $groupId): self
    {
        $this->groupId = $groupId;

        return $this;
    }


}
