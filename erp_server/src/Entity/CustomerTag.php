<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * CustomerTag
 *
 * @ORM\Table(name="customer_tag")
 * @ORM\Entity(repositoryClass="App\Repository\CustomerTagRepository")
 */
class CustomerTag
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
     * @ORM\Column(name="word", type="string", length=200, nullable=false)
     */
    private $word;

    /**
     * @var int
     *
     * @ORM\Column(name="tag", type="integer", nullable=false)
     */
    private $tag;

    /**
     * @var float
     *
     * @ORM\Column(name="probability", type="float", precision=10, scale=0, nullable=false)
     */
    private $probability;

    public function getRowId(): ?int
    {
        return $this->rowId;
    }

    public function getWord(): ?string
    {
        return $this->word;
    }

    public function setWord(string $word): self
    {
        $this->word = $word;

        return $this;
    }

    public function getTag(): ?int
    {
        return $this->tag;
    }

    public function setTag(int $tag): self
    {
        $this->tag = $tag;

        return $this;
    }

    public function getProbability(): ?float
    {
        return $this->probability;
    }

    public function setProbability(float $probability): self
    {
        $this->probability = $probability;

        return $this;
    }


}
