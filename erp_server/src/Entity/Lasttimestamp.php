<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Lasttimestamp
 *
 * @ORM\Table(name="lasttimestamp")
 * @ORM\Entity
 */
class Lasttimestamp
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
     * @var float|null
     *
     * @ORM\Column(name="last_time_stamp", type="float", precision=10, scale=0, nullable=true)
     */
    private $lastTimeStamp;

    public function getRowid(): ?int
    {
        return $this->rowid;
    }

    public function getLastTimeStamp(): ?float
    {
        return $this->lastTimeStamp;
    }

    public function setLastTimeStamp(?float $lastTimeStamp): self
    {
        $this->lastTimeStamp = $lastTimeStamp;

        return $this;
    }


}
