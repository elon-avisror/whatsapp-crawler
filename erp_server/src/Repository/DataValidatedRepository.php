<?php
/**
 * Created by PhpStorm.
 * User: אייל נעמן
 * Date: 25/02/2019
 * Time: 11:49
 */

namespace App\Repository;

use App\Entity\DataValidated;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

class DataValidatedRepository extends ServiceEntityRepository{

    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, DataValidated::class);
    }

    public function getValidatedData($since,$until,$group_id){
        $qb = $this->createQueryBuilder("d")
            ->andWhere("d.lastUpdate >= :since AND d.lastUpdate <= :until")
            ->setParameter("since", $since)
            ->setParameter("until", $until)
            ->andWhere("d.groupId = :groupId")
            ->setParameter("groupId", $group_id)
            ->orderBy('d.lastUpdate', 'ASC');
        $q = $qb->getQuery();
        $data = $q->execute();
        return $data;
    }

}