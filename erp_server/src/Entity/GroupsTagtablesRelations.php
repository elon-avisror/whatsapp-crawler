<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * GroupsTagtablesRelations
 *
 * @ORM\Table(name="groups_tagtables_relations")
 * @ORM\Entity
 */
class GroupsTagtablesRelations
{
    /**
     * @var int
     *
     * @ORM\Column(name="row_id", type="integer", nullable=false)
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="IDENTITY")
     */
    private $rowId;

    /**
     * @var string
     *
     * @ORM\Column(name="tag_table", type="string", length=200, nullable=false)
     */
    private $tagTable;

    /**
     * @var string|null
     *
     * @ORM\Column(name="groups_associated", type="string", length=500, nullable=true)
     */
    private $groupsAssociated;

    public function getRowId(): ?int
    {
        return $this->rowId;
    }

    public function getTagTable(): ?string
    {
        return $this->tagTable;
    }

    public function setTagTable(string $tagTable): self
    {
        $this->tagTable = $tagTable;

        return $this;
    }

    public function getGroupsAssociated(): ?string
    {
        return $this->groupsAssociated;
    }

    public function setGroupsAssociated(?string $groupsAssociated): self
    {
        $this->groupsAssociated = $groupsAssociated;

        return $this;
    }


}
