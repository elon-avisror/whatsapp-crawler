<?php
/**
 * Created by PhpStorm.
 * User: אייל נעמן
 * Date: 13/01/2019
 * Time: 14:18
 */

namespace App\Repository;


use App\Entity\CustomerTag;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

class CustomerTagRepository extends ServiceEntityRepository{

    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, CustomerTag::class);
    }

    public function getTable(){
        $qb = $this->createQueryBuilder("c")
            ->andWhere("c.rowId > :value")
            ->setParameter("value", 0);

        $q = $qb->getQuery();
        return $q->execute();

    }
}