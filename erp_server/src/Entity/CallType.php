<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * CallType
 *
 * @ORM\Table(name="call_type")
 * @ORM\Entity
 */
class CallType
{
    /**
     * @var int
     *
     * @ORM\Column(name="call_type_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $callTypeId;

    /**
     * @var string|null
     *
     * @ORM\Column(name="description", type="string", length=1000, nullable=true)
     */
    private $description;

    public function getCallTypeId(): ?int
    {
        return $this->callTypeId;
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


}
