<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Validationlinks
 *
 * @ORM\Table(name="validationlinks")
 * @ORM\Entity(repositoryClass="App\Repository\ValidationLinkRepository")
 */
class Validationlinks
{
    /**
     * @var int
     *
     * @ORM\Column(name="linkId", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $linkid;

    /**
     * @var string
     *
     * @ORM\Column(name="link", type="string", length=2000, nullable=false)
     */
    private $link;

    /**
     * @var string
     *
     * @ORM\Column(name="sendTo", type="string", length=200, nullable=false)
     */
    private $sendto;

    /**
     * @var float
     *
     * @ORM\Column(name="sent", type="float", precision=10, scale=0, nullable=false)
     */
    private $sent;

    /**
     * @var float
     *
     * @ORM\Column(name="timestamp", type="float", precision=10, scale=0, nullable=false)
     */
    private $timestamp;

    /**
     * @var string
     *
     * @ORM\Column(name="msg_id", type="string", length=100, nullable=false)
     */
    private $msgId;

    /**
     * @var string
     *
     * @ORM\Column(name="dataToValidate", type="text", length=0, nullable=false)
     */
    private $datatovalidate;

    /**
     * @var bool
     *
     * @ORM\Column(name="status", type="boolean", nullable=false)
     */
    private $status;

    public function getLinkid(): ?int
    {
        return $this->linkid;
    }

    public function getLink(): ?string
    {
        return $this->link;
    }

    public function setLink(string $link): self
    {
        $this->link = $link;

        return $this;
    }

    public function getSendto(): ?string
    {
        return $this->sendto;
    }

    public function setSendto(string $sendto): self
    {
        $this->sendto = $sendto;

        return $this;
    }

    public function getSent(): ?float
    {
        return $this->sent;
    }

    public function setSent(float $sent): self
    {
        $this->sent = $sent;

        return $this;
    }

    public function getTimestamp(): ?float
    {
        return $this->timestamp;
    }

    public function setTimestamp(float $timestamp): self
    {
        $this->timestamp = $timestamp;

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

    public function getDatatovalidate(): ?string
    {
        return $this->datatovalidate;
    }

    public function setDatatovalidate(string $datatovalidate): self
    {
        $this->datatovalidate = $datatovalidate;

        return $this;
    }

    public function getStatus(): ?bool
    {
        return $this->status;
    }

    public function setStatus(bool $status): self
    {
        $this->status = $status;

        return $this;
    }


}
