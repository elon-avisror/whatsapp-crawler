<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * LastMsgPerGroup
 *
 * @ORM\Table(name="last_msg_per_group")
 * @ORM\Entity
 */
class LastMsgPerGroup
{
    /**
     * @var int
     *
     * @ORM\Column(name="rowId", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $rowid;

    /**
     * @var float|null
     *
     * @ORM\Column(name="timestamp", type="float", precision=10, scale=0, nullable=true)
     */
    private $timestamp;

    /**
     * @var int
     *
     * @ORM\Column(name="group_id", type="integer", nullable=false)
     */
    private $groupId;

    public function getRowid(): ?int
    {
        return $this->rowid;
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
