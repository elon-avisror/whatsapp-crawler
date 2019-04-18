<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * CallStatus
 *
 * @ORM\Table(name="call_status")
 * @ORM\Entity
 */
class CallStatus
{
    /**
     * @var int
     *
     * @ORM\Column(name="rowid", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $rowid;

    /**
     * @var int|null
     *
     * @ORM\Column(name="call_id", type="integer", nullable=true)
     */
    private $callId;

    /**
     * @var string|null
     *
     * @ORM\Column(name="status", type="string", length=1000, nullable=true)
     */
    private $status;

    /**
     * @var float|null
     *
     * @ORM\Column(name="timestamp", type="float", precision=10, scale=0, nullable=true)
     */
    private $timestamp;

    public function getRowid(): ?int
    {
        return $this->rowid;
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

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(?string $status): self
    {
        $this->status = $status;

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


}
