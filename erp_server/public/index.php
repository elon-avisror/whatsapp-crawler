<?php
/*
 * (repositoryClass="App\Repository\TagsRepository")
 *
 * in every adding or changing at the DB - the commands must be submitted to CMD:
 * php bin/console cache:clear --no-warmup --env=dev
 * php bin/console cache:clear --no-warmup --env=prod
 * php bin/console doctrine:mapping:import App\Entity annotation --path=src/Entity ///(make sure you get namespace App\Entity;)
 * php bin/console make:entity --regenerate App
 *
 * make sure it is in Entity/Message.php: @ORM\Entity(repositoryClass="App\Repository\MessageRepository")
 * make sure it is in Entity/CustomerTag.php: @ORM\Entity(repositoryClass="App\Repository\CustomerTagRepository")
 * make sure it is in Entity/ValidationLinks.php: @ORM\Entity(repositoryClass="App\Repository\ValidationLinkRepository")
 * make sure it is in Entity/DataValidated.php: @ORM\Entity(repositoryClass="App\Repository\DataValidatedRepository")
 * */

use App\Kernel;
use Symfony\Component\Debug\Debug;
use Symfony\Component\Dotenv\Dotenv;
use Symfony\Component\HttpFoundation\Request;


require __DIR__.'/../vendor/autoload.php';
date_default_timezone_set ("Asia/Jerusalem");
// The check is to ensure we don't use .env in production
if (!isset($_SERVER['APP_ENV']) && !isset($_ENV['APP_ENV'])) {
    if (!class_exists(Dotenv::class)) {
        throw new \RuntimeException('APP_ENV environment variable is not defined. You need to define environment variables for configuration or add "symfony/dotenv" as a Composer dependency to load variables from a .env file.');
    }
    (new Dotenv())->load(__DIR__.'/../.env');
}

$env = $_SERVER['APP_ENV'] ?? $_ENV['APP_ENV'] ?? 'dev';
$debug = (bool) ($_SERVER['APP_DEBUG'] ?? $_ENV['APP_DEBUG'] ?? ('prod' !== $env));

if ($debug) {
    umask(0000);

    Debug::enable();
}

if ($trustedProxies = $_SERVER['TRUSTED_PROXIES'] ?? $_ENV['TRUSTED_PROXIES'] ?? false) {
    Request::setTrustedProxies(explode(',', $trustedProxies), Request::HEADER_X_FORWARDED_ALL ^ Request::HEADER_X_FORWARDED_HOST);
}

if ($trustedHosts = $_SERVER['TRUSTED_HOSTS'] ?? $_ENV['TRUSTED_HOSTS'] ?? false) {
    Request::setTrustedHosts(explode(',', $trustedHosts));
}

$kernel = new Kernel($env, $debug);
$request = Request::createFromGlobals();
$response = $kernel->handle($request);
$response->send();
$kernel->terminate($request, $response);
