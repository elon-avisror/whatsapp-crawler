# WhatsAppCrawler (WAC)

## Introduction

1. The system include 3 main parts:

   1. **crawler_machine** - running every 10 minutes (X time that we decide). His main part is to extract the information accurately and send it to the **analysis_server**. You can run it by execute: "node crawler_machine/wac.js" (notice: you must have node installed in your machine).
   2. **analysis_server** - always listening, his three main parts are:
      - Analyze the data, whose sended by the **crawler_machine** and transferred it to the **erp_server**.
      - Ask for data from the **erp_server** to the **result page** (an html page).
      - Analyzes the messages by requesting new messages for analysis (from time to time) from the **erp_server**.
      - You can run it by execute: "node analysis_machine/app.js" (notice: you must have node installed in your machine).
   3. **erp_server** - always listening, his two main parts are:
      - Save data in the DB and to import data from it (by requests).
      - Deal with links for phones.

2. The purpose of the 3 parts, is for easy maintenance, privacy of our data and easily doing backup.

## Installation

### _NodeJS_ installation at project directory (wac)

1. **crawler_machine**:
   1. npm install puppeteer
   2. npm install nodemailer
   3. npm install dateformat
2. **analysis_server**:
   1. cp ../extra_info/wac_configuration/config.js analysis/config.js
   2. npm install express
   3. npm install request

## Processes

1. **_PHP_** - **erp_server** listening always as apache server, needs to run before other applications (black box).

2. **_NodeJS_** - node **crawler_machine**/wac.js --> run the whole application, first reading the QA.png:

   - if exists, enter the apllication.
   - others, needs to add by the developer (at first time).
   - finally, the app listening to groups in whatsapp and get sleep to 10 minutes (every reading).

3. **_NodeJS_** - node **analysis_server**/app.js --> **analysis_server**/routes.js --> **analysis_server**/api/analysis.js --> **analysis_server**/modules/httpSender.js --> **erp_server**.

### Made by _Elon Avisror & Mahdi Asali_ \ ( ゜ o ゜)ノ

![GitHub Logo](/crawler_machine/logo.gif)
