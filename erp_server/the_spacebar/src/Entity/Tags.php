<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Tags
 *
 * @ORM\Table(name="tags")
 * @ORM\Entity
 */
class Tags
{
    /**
     * @var int
     *
     * @ORM\Column(name="tag_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $tagId;

    /**
     * @var int|null
     *
     * @ORM\Column(name="tag", type="integer", nullable=true)
     */
    private $tag;

    /**
     * @var string
     *
     * @ORM\Column(name="msg_id", type="string", length=500, nullable=false)
     */
    private $msgId;

    /**
     * @var string|null
     *
     * @ORM\Column(name="tag_type", type="string", length=500, nullable=true)
     */
    private $tagType;

    /**
     * @var float|null
     *
     * @ORM\Column(name="probability", type="float", precision=10, scale=0, nullable=true)
     */
    private $probability;

    /**
     * @var string|null
     *
     * @ORM\Column(name="text", type="string", length=1000, nullable=true)
     */
    private $text;

    /**
     * @var string|null
     *
     * @ORM\Column(name="msg", type="text", length=65535, nullable=true)
     */
    private $msg;

    public function getTagId(): ?int
    {
        return $this->tagId;
    }

    public function getTag(): ?int
    {
        return $this->tag;
    }

    public function setTag(?int $tag): self
    {
        $this->tag = $tag;

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

    public function getTagType(): ?string
    {
        return $this->tagType;
    }

    public function setTagType(?string $tagType): self
    {
        $this->tagType = $tagType;

        return $this;
    }

    public function getProbability(): ?float
    {
        return $this->probability;
    }

    public function setProbability(?float $probability): self
    {
        $this->probability = $probability;

        return $this;
    }

    public function getText(): ?string
    {
        return $this->text;
    }

    public function setText(?string $text): self
    {
        $this->text = $text;

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


}
