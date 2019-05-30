# WhatsAppCrawler (WAC)

## Introduction

The system include 3 main parts:

1. **crawler_machine** - running every 10 minutes (X time that we decide). His main part is to extract the information accurately and send it to the **analysis_server**. You can run it by execute: "node crawler_machine/wac.js" (notice: you must have node installed in your machine).
2. **analysis_server** - always listening, his three main parts are:
   - Analyze the data, whose sended by the **crawler_machine** and transferred it to the **erp_server**.
   - Ask for data from the **erp_server** to the **result page** (an html page).
   - Analyzes the messages by requesting new messages for analysis (from time to time) from the **erp_server**.
   - You can run it by execute: "node analysis_machine/app.js" (notice: you must have node installed in your machine).
3. **erp_server** - always listening, his two main parts are:
   - Save data in the DB and to import data from it (by requests).
   - Deal with links for phones.

The purpose of the 3 parts, is for easy maintenance, privacy of our data and easily doing backup.

## Installation

_NodeJS_ installation at project directory ("wac") and _PHP_ installation at "erp_server" directory:

1. **crawler_machine** (_NodeJS_):
   - npm install puppeteer
   - npm install nodemailer
   - npm install dateformat
2. **analysis_server** (_NodeJS_):
   - cp ../extra_info/configuration/config.js analysis_server/config.js
   - npm install express
   - npm install request
   - npm install pm2 (add "-g" in production)
3. **erp_server** (_PHP_):
   - cp ../extra_info/configuration/.env erp_server/.env
   - [Apache2 installation guide for Linux](https://tecadmin.net/install-symfony-2-framework-on-ubuntu/)
   - [Apache2 installation guide for Windows](https://seiler.it/installing-symfony-framework-into-xampp-for-windows/)
   - [PHP7.1 installation guide for Linux](https://hostadvice.com/how-to/how-to-install-apache-mysql-php-on-an-ubuntu-18-04-vps/)
   - [PHP7.1 installation guide for Windows](https://www.sitepoint.com/how-to-install-php-on-windows/)
   - [Composer installation guide for Linux](https://www.ionos.com/community/hosting/php/install-and-use-php-composer-on-ubuntu-1604/)
   - [Composer installation guide for Windows](https://www.jeffgeerling.com/blog/2018/installing-php-7-and-composer-on-windows-10)
   - composer install
   - [Debugging with xdebug for Linux](http://www.dieuwe.com/blog/xdebug-ubuntu-1604-php7)
   - [Debugging with xdebug for Windows](https://xdebug.org/download.php)
4. **others**:
   - VSCode
   - PhpStorm
   - MySQL Workbench
   - Postman

## Processes

On air, we use pm2 (as service for all servers and machines)

1. **_PHP_** - **erp_server** listening always as apache server, needs to run before other applications (black box), via commands (all commands will do with permission "sudo"):

    **_Linux_**

    - cd /etc/apache2/sites-available/
    - sudo cp 000-default.conf wac.conf
    - sudo nano wac.conf (and edit to):

            <VirtualHost *:80>

                 ServerName wac.local
                 ServerAdmin webmaster@localhost
                 DocumentRoot {PROJECT_DIRECTORY}/erp_server/public/

                 <Directory {PROJECT_DIRECTORY}/erp_server/public/>
                        Options Indexes FollowSymLinks
                        AllowOverride All
                        Require all granted
                 </Directory>

                 # Available loglevels: trace8, ..., trace1, debug, info, notice, warn, error, crit, alert, emerg.
                 # It is also installation possible to configure the loglevel for particular modules, e.g.
                 LogLevel debug
                 #ErrorLog ${APACHE_LOG_DIR}/wac/error.log
                 #CustomLog ${APACHE_LOG_DIR}/wac/access.log combined

            </VirtualHost>

    - sudo a2ensite wac.conf
    - sudo service apache2 restart
    - sudo nano /etc/hosts (and add):

            127.0.0.1   wac.local

    **_Windows_**

    - copy a shortcut of C:\xampp\apache\conf\extra\httpd-vhosts.conf file, and edit that file edit to:

            <VirtualHost *:80>

                 ServerName wac.local
                 ServerAdmin webmaster@localhost
                 DocumentRoot {PROJECT_DIRECTORY}/erp_server/public/

                 <Directory {PROJECT_DIRECTORY}/erp_server/public/>
                        Options Indexes FollowSymLinks
                        AllowOverride All
                        Require all granted
                 </Directory>

                 # Available loglevels: trace8, ..., trace1, debug, info, notice, warn, error, crit, alert, emerg.
                 # It is also possible to configure the loglevel for particular modules, e.g.
                 LogLevel debug
                 #ErrorLog ${APACHE_LOG_DIR}/wac/error.log
                 #CustomLog ${APACHE_LOG_DIR}/wac/access.log combined

            </VirtualHost>

    - copy a shortcut of C:\Windows\System32\drivers\etc\hosts file, and edit that file (with Administrator Permissions) and add:

            127.0.0.1   wac.local

2. **_NodeJS_** - node **crawler_machine**/wac.js --> run the whole application, first reading the QR.png:

    - if exists, enter the apllication.
    - others, needs to add by the developer (at first time).
    - finally, the app listening to groups in whatsapp and get sleep to 10 minutes (every reading).

3. **_NodeJS_** - node **analysis_server**/app.js --> **analysis_server**/routes.js --> **analysis_server**/api/analysis.js --> **analysis_server**/modules/httpSender.js --> **erp_server**.

## Configuration

1. **erp_server**/.env file - in order to configurate the **erp_server**.
2. **analysis_server**/config.js - in order to configurate the **analysis_server**.
3. **crawler_machine**/wac.js - in HOST field, in order to configurate the **crawler_machine**.

### Made by _Elon Avisror & Mahdi Asali_ \ ( ゜ o ゜)ノ

![GitHub Logo](/crawler_machine/logo.gif)
