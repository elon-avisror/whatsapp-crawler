const puppeteer = require("puppeteer");
var request = require("request");

const DEBUG = true;

// hard coded strings and settings
const searchBarSelector = ".jN-F5";
const whatsappWebDomain = "https://web.whatsapp.com";
const userDataLocation = "user_data_bn2";
const QRfileLocation = "QR.png";
const QRreloadSelector = ".HnNfm";
const groupClassSelector = "._1wjpf";
const groupDetailsClassSelector = "._2zCDG";
const rightBarUnreadMessagesSelector = ".OUeyt";
const searchHeaderSelector = "._1AKfk";
const groupCreatedDateSelector = "._3GoJv"; // V
const scrollButtomSelector = "._298R6";
const messageSelector = "._3Usvm";
const REFACTORmessage = "vW7d1 _1nHRW";
const browserWidth = 1920 / 1.5;
const browserHeight = 1080 / 1.5;
const isheadless = false;

//global variables
var browser = {};
var page = {};

//TODO: read this array from external file, DB, or external node parameter
var groupsArray = ["Home Sweet Home"]; // ["מפעל בתי חולים", "WhatsApp Crawler 2", 'Cambium-team'];

//main code
(async () => {
    // setting chrome environment
    const browserOptions = {
        // so we can scan the QR code
        headless: isheadless,
        // so we can save session data from one run to another. full path due to a bug in headlesschrome
        userDataDir: "C:\\Projects\\wac\\" + userDataLocation
    };

    browser = await puppeteer.launch(browserOptions);
    console.log(await browser.version());

    page = await browser.newPage();
    await page.setUserAgent(
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3641.0 Safari/537.36"
    );
    await page.setViewport({
        width: browserWidth,
        height: browserHeight,
        deviceScaleFactor: 2
    });

    // load WA and wait for log-in
    if (DEBUG) console.log("loading " + whatsappWebDomain);
    await page.goto(whatsappWebDomain);

    //

    // wait for class that appears only when logged in
    await loginCheck();

    console.log("END. Closing browser");
    if (isheadless) await browser.close();
})();

async function loginCheck() {
    try {
        await page.waitFor(searchBarSelector, {
            timeout: 15000
        });
        //TODO: add try-catch for error handling
        //TODO: handle the case of "whatsapp is open in another window"
        //TODO: send the QR screenshot so we can scan it headless
        if (DEBUG) console.log("logged-in");
        //clicking on relevant groups and opening group details
        for (group of groupsArray) {
            await readGroup(group);
        }
    } catch (e) {
        if (DEBUG) console.log("not logged-in or error: " + e.message);
        //click the reload button if exists
        try {
            await page.waitFor(QRreloadSelector, {
                timeout: 1500
            }); //TODO: add try-catch for error handling
            //not working, using workaround below: await page.click('QRreloadSelector');
            await page.evaluate(
                QRreloadSelector => document.querySelector(QRreloadSelector).click(),
                QRreloadSelector
            );
            await page.waitFor(2000); //time for QR regenerate
        } catch (e) {}
        await page.screenshot({
            path: QRfileLocation
        });
        await loginCheck();
        //TODO: send this file as an email to admin
    }
}

async function readGroup(groupName) {
    //triple click to select-all text in search bar
    await page.click(searchBarSelector, {
        clickCount: 3
    });
    //search for group name
    await page.type(searchBarSelector, groupName);
    await page.waitFor(1000); //for typing to end

    try {
        await page.waitFor(searchHeaderSelector, {
            timeout: 5000
        }); //wait for search to be done. TODO: find more rubust way to check
        let newMessagesNumber = await page.evaluate(
            el => el.innerHTML,
            await page.$(rightBarUnreadMessagesSelector)
        );

        /*
                let newMessagesNumber = await page.$eval(rightBarUnreadMessagesSelector, e => e.innerText);
                if (DEBUG) console.log(groupName + " have " + newMessagesNumber + " new messages");
                */

        //click on the result to open group (//TODO: What if I have 2?)
        groupSelector = groupClassSelector + '[title*="' + groupName + '"]';
        await page.waitFor(groupSelector); //TODO: add try-catch for error handling
        await page.click(groupSelector);

        //click to scroll to buttom
        try {
            await page.waitFor(scrollButtomSelector, {
                timeout: 3000
            }); //TODO: add try-catch for error handling
            await page.click(scrollButtomSelector);
        } catch (e) {
            if (DEBUG) console.log("already scrolled to bottom");
        }
        //click to see details
        groupDetailsSelector = groupDetailsClassSelector + " " + groupSelector;
        await page.waitFor(groupDetailsSelector); //TODO: add try-catch for error handling
        await page.click(groupDetailsSelector);

        //read group created date
        await page.waitFor(groupCreatedDateSelector, {
            timeout: 10000
        });
        let gropupCreatedDateString = await page.$eval(
            groupCreatedDateSelector,
            e => e.innerText
        );
        gropupCreatedDateString = gropupCreatedDateString.replace(
            /[^\d//:\s]/g,
            ""
        );
        if (DEBUG)
            console.log(groupName + " creation date is " + gropupCreatedDateString);

        //read relevant (last new) messages
        await page.waitFor(messageSelector, {
            timeout: 5000
        });
        let messages = await page.$$(REFACTORmessage);
        for (element of messages) {
            let packetObject = {};
            packetObject.group_name = groupName;
            packetObject.group_creation_time = gropupCreatedDateString;

            packetObject.msg = await page.evaluate(
                el => el.querySelector("span").innerText,
                element
            );

            let senderid = await page.evaluate(
                el => el.getAttribute("data-pre-plain-text"),
                element
            );
            packetObject.sender_id = senderid
                .replace(/ *\[[^\]]*]/g, "")
                .replace(/[^\d.+]/g, "");

            let timeString = await page.evaluate(
                el => el.querySelector("._3EFt_"),
                element
            );
            console.log("time: " + timeString);
            packetObject.ts = new Date().getTime();

            //packetObject.msg_id = calcMD5(packetObject.msg + packetObject.sender_id + packetObject.ts)

            sendMessage(packetObject);

            //packetObject.sender_id = //$('._3Usvm')
            // pass the single handle below
            if (DEBUG)
                console.log(
                    groupName + ": " + packetObject.sender_id + ": " + packetObject.msg
                );
        }

        if (DEBUG) console.log('group named:"' + groupName + '" read is done');
        //for testing:
        if (DEBUG) {
            await page.waitFor(2000);
            await page.screenshot({
                path: groupName + ".png"
            });
        }
    } catch (error) {
        if (DEBUG)
            console.log("no new messages in " + groupName + " " + error.message);
    }

    /*
            try {
                await page.waitForSelector(('[title*="WhatsApp Crawler 2"]'), { timeout: 2000 })
                // ...
                console.log('found');
              } catch (error) {
                console.log("The element didn't appear.")
              }
            */
}

async function sendMessage(packetObject) {
    request.post(
        "https://unidress.cambium.co.il:8080/classifyMsg", {
            json: packetObject
        },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log(body);
            } else console.log(response);
        }
    );
}