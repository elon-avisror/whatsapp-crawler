<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Issue
 *
 * @ORM\Table(name="issue")
 * @ORM\Entity
 */
class Issue
{
    /**
     * @var int
     *
     * @ORM\Column(name="issue_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $issueId;

    /**
     * @var string|null
     *
     * @ORM\Column(name="description", type="string", length=100, nullable=true)
     */
    private $description;

    public function getIssueId(): ?int
    {
        return $this->issueId;
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
