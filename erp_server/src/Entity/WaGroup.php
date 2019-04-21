<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * WaGroup
 *
 * @ORM\Table(name="wa_group")
 * @ORM\Entity
 */
class WaGroup
{
    /**
     * @var int
     *
     * @ORM\Column(name="group_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $groupId;

    /**
     * @var string
     *
     * @ORM\Column(name="group_name", type="string", length=100, nullable=false)
     */
    private $groupName;

    /**
     * @var string|null
     *
     * @ORM\Column(name="wa_id", type="string", length=100, nullable=true)
     */
    private $waId;

    /**
     * @var string
     *
     * @ORM\Column(name="created_time", type="string", length=100, nullable=false)
     */
    private $createdTime;

    /**
     * @var string|null
     *
     * @ORM\Column(name="confirmation_tel", type="string", length=100, nullable=true)
     */
    private $confirmationTel;

    public function getGroupId(): ?int
    {
        return $this->groupId;
    }

    public function getGroupName(): ?string
    {
        return $this->groupName;
    }

    public function setGroupName(string $groupName): self
    {
        $this->groupName = $groupName;

        return $this;
    }

    public function getWaId(): ?string
    {
        return $this->waId;
    }

    public function setWaId(?string $waId): self
    {
        $this->waId = $waId;

        return $this;
    }

    public function getCreatedTime(): ?string
    {
        return $this->createdTime;
    }

    public function setCreatedTime(string $createdTime): self
    {
        $this->createdTime = $createdTime;

        return $this;
    }

    public function getConfirmationTel(): ?string
    {
        return $this->confirmationTel;
    }

    public function setConfirmationTel(?string $confirmationTel): self
    {
        $this->confirmationTel = $confirmationTel;

        return $this;
    }


}
