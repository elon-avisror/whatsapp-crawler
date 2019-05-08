<?php
/**
 * Created by PhpStorm.
 * User: אייל נעמן
 * Date: 25/10/2018
 * Time: 09:32
 */

namespace App\Controller;


use Psr\Log\LoggerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Response;

class ArticleController
{





    /**
     * @Route("/")
     */
    public function homepage(LoggerInterface $logger){
        $logger->info("Hello");
        $logger->critical("critic");
        return new Response('my first page122242');
    }

    /**
     * @Route("/news/{data1}/{data2}")
     */
    public function show($data1,$data2){
       return new Response($data1 .'<->'. $data2);
    }


}