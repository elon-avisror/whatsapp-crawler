<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * UdCall
 *
 * @ORM\Table(name="ud_call")
 * @ORM\Entity
 */
class UdCall
{
    /**
     * @var int
     *
     * @ORM\Column(name="call_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $callId;

    /**
     * @var int|null
     *
     * @ORM\Column(name="call_type_id", type="integer", nullable=true)
     */
    private $callTypeId;

    /**
     * @var int|null
     *
     * @ORM\Column(name="issue_id", type="integer", nullable=true)
     */
    private $issueId;

    /**
     * @var string|null
     *
     * @ORM\Column(name="sender_id", type="string", length=500, nullable=true)
     */
    private $senderId;

    /**
     * @var string|null
     *
     * @ORM\Column(name="reciever", type="string", length=1000, nullable=true)
     */
    private $reciever;

    /**
     * @var string|null
     *
     * @ORM\Column(name="group_id", type="string", length=500, nullable=true)
     */
    private $groupId;

    /**
     * @var string|null
     *
     * @ORM\Column(name="description", type="string", length=500, nullable=true)
     */
    private $description;

    /**
     * @var string|null
     *
     * @ORM\Column(name="status", type="string", length=500, nullable=true)
     */
    private $status;

    /**
     * @var float|null
     *
     * @ORM\Column(name="register_time", type="float", precision=10, scale=0, nullable=true)
     */
    private $registerTime;

    /**
     * @var float|null
     *
     * @ORM\Column(name="last_update", type="float", precision=10, scale=0, nullable=true)
     */
    private $lastUpdate;

    /**
     * @var string|null
     *
     * @ORM\Column(name="original_msg_id", type="string", length=500, nullable=true)
     */
    private $originalMsgId;

    /**
     * @var string|null
     *
     * @ORM\Column(name="client_id", type="string", length=500, nullable=true)
     */
    private $clientId;

    public function getCallId(): ?int
    {
        return $this->callId;
    }

    public function getCallTypeId(): ?int
    {
        return $this->callTypeId;
    }

    public function setCallTypeId(?int $callTypeId): self
    {
        $this->callTypeId = $callTypeId;

        return $this;
    }

    public function getIssueId(): ?int
    {
        return $this->issueId;
    }

    public function setIssueId(?int $issueId): self
    {
        $this->issueId = $issueId;

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

    public function getReciever(): ?string
    {
        return $this->reciever;
    }

    public function setReciever(?string $reciever): self
    {
        $this->reciever = $reciever;

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

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): self
    {
        $this->description = $description;

        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(?string $status): self
    {
        $this->status = $status;

        return $this;
    }

    public function getRegisterTime(): ?float
    {
        return $this->registerTime;
    }

    public function setRegisterTime(?float $registerTime): self
    {
        $this->registerTime = $registerTime;

        return $this;
    }

    public function getLastUpdate(): ?float
    {
        return $this->lastUpdate;
    }

    public function setLastUpdate(?float $lastUpdate): self
    {
        $this->lastUpdate = $lastUpdate;

        return $this;
    }

    public function getOriginalMsgId(): ?string
    {
        return $this->originalMsgId;
    }

    public function setOriginalMsgId(?string $originalMsgId): self
    {
        $this->originalMsgId = $originalMsgId;

        return $this;
    }

    public function getClientId(): ?string
    {
        return $this->clientId;
    }

    public function setClientId(?string $clientId): self
    {
        $this->clientId = $clientId;

        return $this;
    }


}
