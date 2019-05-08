<?php

namespace App\Controller;


use Psr\Log\LoggerInterface;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Response;

class ArticleController
{

    /**
     * @Route("/")
     */
    public function homepage(LoggerInterface $logger)
    {
        $logger->info("Hello");
        $logger->critical("critic");
        return new Response('WAC');
    }

    /**
     * @Route("/news/{data1}/{data2}")
     */
    public function show($data1, $data2)
    {
        return new Response($data1 . '<->' . $data2);
    }
}
