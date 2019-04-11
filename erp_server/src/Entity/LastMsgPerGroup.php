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
     * @var int
     *
     * @ORM\Column(name="msgId", type="integer", nullable=false)
     */
    private $msgid;

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

    public function getMsgid(): ?int
    {
        return $this->msgid;
    }

    public function setMsgid(int $msgid): self
    {
        $this->msgid = $msgid;

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
