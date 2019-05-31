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
        return new Response('<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <title>WAC Home Page</title>
        </head>
        <body>
            <h1>WAC Online<h1>
            <style type="text/css">
                .my_content_container a {
                border-bottom: 1px solid #777777;
                border-left: 1px solid #000000;
                border-right: 1px solid #333333;
                border-top: 1px solid #000000;
                color: #000000;
                display: block;
                height: 2.0em;
                padding: 0 1em;
                width: 2.5em;       
                text-decoration: none;       
                }
            // :hover and :active styles left as an exercise for the reader.
            </style>

            <div class="my_content_container">
                <a href="http://whatsapp-crawler.com/assets/views/index.html">Click</a>
            </div>
        </body>
        </html>');
    }

    /**
     * @Route("/news/{data1}/{data2}")
     */
    public function show($data1, $data2)
    {
        return new Response($data1 . '<->' . $data2);
    }
}
