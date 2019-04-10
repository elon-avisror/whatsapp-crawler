const puppeteer = require("puppeteer");

const DEBUG = true;

// hard coded strings and settings
const searchbarSelector = ".jN-F5";
const whatsappWebDomain = "https://web.whatsapp.com";
const userDataLocation = "user_data_h3";
const QRfileLocation = "QR.png";
const QRreloadSelector = ".HnNfm";
const groupClassSelector = "._1wjpf";
const groupDetailsClassSelector = "._2zCDG";
const browserWidth = 1920 / 1.5;
const browserHeight = 1080 / 1.5;
const isheadless = true;


// global variables
var browser = {};
var page = {};

// TODO: read this array from external file, DB, or external node parameter
var groupsArray = ["WhatsApp Crawler 2", "Cambium-team"];

// main code
(async () => {

    // setting chrome environment
    const browserOptions = {
        headless: isheadless, // so we can scan the QR code 
        userDataDir: "C:\\Projects\\wac\\" + userDataLocation // so we can save session data from one run to another. full path due to a bug in headlesschrome

    };

    browser = await puppeteer.launch(browserOptions);
    console.log(await browser.version());

    page = await browser.newPage();
    await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3641.0 Safari/537.36");
    await page.setViewport({
        width: browserWidth,
        height: browserHeight,
        deviceScaleFactor: 2
    });

    // load WA and wait for log-in
    if (DEBUG) console.log("loading " + whatsappWebDomain)
    await page.goto(whatsappWebDomain);

    //

    // wait for class that appears only when logged in 
    await loginCheck();

    console.log("END. Closing browser");
    await browser.close();
})();

async function loginCheck() {
    try {
        await page.waitFor(searchbarSelector, {
            timeout: 15000
        });
        // TODO: add try-catch for error handling
        // TODO: handle the case of "whatsapp is open in another window"
        // TODO: send the QR screenshot so we can scan it headless
        if (DEBUG)
            console.log("logged-in");
        // clicking on relevant groups and opening group details
        for (group of groupsArray) {
            await readGroup(group);
        }
    } catch (e) {
        if (DEBUG)
            console.log("not logged-in or error");
        // click the reload button if exists
        try {
            await page.waitFor(QRreloadSelector, {
                timeout: 1500
            }) // TODO: add try-catch for error handling

            // not working, using workaround below: await page.click("QRreloadSelector");
            await page.evaluate((QRreloadSelector) => document.querySelector(QRreloadSelector).click(), QRreloadSelector);
            await page.waitFor(2000); // time for QR regenerate

        } catch (e) {

        }
        await page.screenshot({
            path: QRfileLocation
        });
        await loginCheck();
        // TODO: send this file as an email to admin
    }
}

async function readGroup(groupName) {
    // triple click to select-all text in search bar
    await page.click(searchbarSelector, {
        clickCount: 3
    });
    // search for group name
    await page.type(searchbarSelector, groupName);

    // click on the result (//TODO: What if I have 2?)
    groupSelector = groupClassSelector + '[title*="' + groupName + '"]';
    await page.waitFor(groupSelector) // TODO: add try-catch for error handling
    await page.click(groupSelector);
    // click to see details
    groupDetailsSelector = groupDetailsClassSelector + ' ' + groupSelector;
    await page.waitFor(groupDetailsSelector) // TODO: add try-catch for error handling
    await page.click(groupDetailsSelector);

    if (DEBUG) console.log('group named:"' + groupName + '" read is done')
    // for testing:
    if (DEBUG) {
        await page.waitFor(2000);
        await page.screenshot({
            path: groupName + '.png'
        });
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