<?php
/**
 * Created by PhpStorm.
 * User: אייל נעמן
 * Date: 10/02/2019
 * Time: 15:35
 */

namespace App\Repository;

use App\Entity\Validationlinks;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

class ValidationLinkRepository extends ServiceEntityRepository{

    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Validationlinks::class);
    }

    public function getValLink(){
        $current_time = strtotime("now")*1000;
        $ONE_MINUTE = 60000;
        $gap =  $current_time - ($ONE_MINUTE * 60 * 24); //<--- 24H
        $qb = $this->createQueryBuilder("v")
            ->andWhere("v.status = :status")
            ->setParameter("status", false)
            ->andWhere("v.sent < :sent")
            ->setParameter("sent", $gap)
            ->orderBy('v.timestamp', 'ASC');

        $q = $qb->getQuery();
        $links = $q->execute();
        return $links;


    }
}