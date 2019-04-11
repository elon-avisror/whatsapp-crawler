# WhatsAppCrawler (WAC)

1. The system include 3 parts:
    1. **crawler_machine** - whose duty is to extract the information accurately and send it to **the erp_server**.
    1. **erp_server** - wose duty is to first of all, save the data (for backup) and secondly, to examine whether the message needs to be analyzed and transferred to the **analysis_server** (or not).
    1. **analysis_server** - analyzes the messages by requesting new messages for analysis (from time to time) from the **erp_server**.

2. The purpose of the 3 parts, is for easy maintenance, privacy of our data and easily doing backup.

3. *Made by Elon Avisror and Mahdi Asali* \ ( ゜ o ゜)ノ

![GitHub Logo](/crawler_machine/logo.gif)