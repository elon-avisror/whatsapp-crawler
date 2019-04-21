<?php
/**
 * Created by PhpStorm.
 * User: אייל נעמן
 * Date: 25/12/2018
 * Time: 11:27
 */

namespace App\Repository;


use App\Entity\Tags;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Symfony\Bridge\Doctrine\RegistryInterface;

class TagsRepository  extends ServiceEntityRepository
{


    public function __construct(RegistryInterface $registry)
    {
        parent::__construct($registry, Tags::class);
    }


    public function getTagsByVars($params){

        $term = false;
        $query = '';
        $and = '';
        foreach($params as $param){
            if($term) $and = ' AND ';
            $query =$query.$and."t.".$param['col']."= '".$param['var']."'";
            $term = true;
        }

        $conn = $this->getEntityManager()->getConnection();
        $sql = "
        SELECT * FROM tags t
        WHERE ".$query.
        "ORDER BY t.probability DESC
        ";

        $stmt = $conn->prepare($sql);
        $stmt->execute();
        return $stmt->fetchAll();


    }
}