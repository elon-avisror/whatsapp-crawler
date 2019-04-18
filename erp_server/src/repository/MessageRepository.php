<?php
/**
 * Created by PhpStorm.
 * User: אייל נעמן
 * Date: 24/12/2018
 * Time: 16:10
 */

namespace App\Repository;


use App\Entity\Message;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

class MessageRepository extends ServiceEntityRepository{


    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Message::class);
    }

    public function getMessagesByTS($timestamp,$g_id){
        $MSG_LIMIT = getenv('MSG_LIMIT');
     /*   $qb = $this->createQueryBuilder("m")
            ->andWhere("m.timestamp > :timestamp")
            ->setParameter("timestamp", $timestamp)
            ->orderBy('m.timestamp', 'DESC')
            ->setMaxResults( $MSG_LIMIT );*/

        $qb =  $this->createQueryBuilder("m")
            ->andWhere("m.groupId = :groupId")
            ->setParameter("groupId", $g_id)
            ->orderBy('m.rowId', 'DESC')
            ->setMaxResults( $MSG_LIMIT );


        $q = $qb->getQuery();
        $ans = $q->execute();
        return $ans;

    }

}