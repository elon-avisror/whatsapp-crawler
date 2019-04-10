<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Message
 *
 * @ORM\Table(name="message")
 * @ORM\Entity(repositoryClass="App\Repository\MessageRepository")
 */
class Message
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
     * @ORM\Column(name="call_id", type="integer", nullable=true)
     */
    private $callId;

    /**
     * @var string|null
     *
     * @ORM\Column(name="msg", type="string", length=1000, nullable=true)
     */
    private $msg;

    /**
     * @var float|null
     *
     * @ORM\Column(name="timestamp", type="float", precision=10, scale=0, nullable=true)
     */
    private $timestamp;

    /**
     * @var string|null
     *
     * @ORM\Column(name="group_id", type="string", length=500, nullable=true)
     */
    private $groupId;

    /**
     * @var string|null
     *
     * @ORM\Column(name="msg_id", type="string", length=500, nullable=true)
     */
    private $msgId;

    /**
     * @var string|null
     *
     * @ORM\Column(name="reference_msg_id", type="string", length=500, nullable=true)
     */
    private $referenceMsgId;

    /**
     * @var string|null
     *
     * @ORM\Column(name="sender_id", type="string", length=200, nullable=true)
     */
    private $senderId;

    public function getRowId(): ?int
    {
        return $this->rowId;
    }

    public function getCallId(): ?int
    {
        return $this->callId;
    }

    public function setCallId(?int $callId): self
    {
        $this->callId = $callId;

        return $this;
    }

    public function getMsg(): ?string
    {
        return $this->msg;
    }

    public function setMsg(?string $msg): self
    {
        $this->msg = $msg;

        return $this;
    }

    public function getTimestamp(): ?float
    {
        return $this->timestamp;
    }

    public function setTimestamp(?float $timestamp): self
    {
        $this->timestamp = $timestamp;

        return $this;
    }

    public function getGroupId(): ?string
    {
        return $this->groupId;
    }

    public function setGroupId(?string $groupId): self
    {
        $this->groupId = $groupId;

        return $this;
    }

    public function getMsgId(): ?string
    {
        return $this->msgId;
    }

    public function setMsgId(?string $msgId): self
    {
        $this->msgId = $msgId;

        return $this;
    }

    public function getReferenceMsgId(): ?string
    {
        return $this->referenceMsgId;
    }

    public function setReferenceMsgId(?string $referenceMsgId): self
    {
        $this->referenceMsgId = $referenceMsgId;

        return $this;
    }

    public function getSenderId(): ?string
    {
        return $this->senderId;
    }

    public function setSenderId(?string $senderId): self
    {
        $this->senderId = $senderId;

        return $this;
    }


}
