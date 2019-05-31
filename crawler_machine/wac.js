const puppeteer = require("puppeteer");
var crypto = require("crypto");
const http = require("http");
var fs = require("fs");
var nodemailer = require("nodemailer");
const path = require("path");
var dateFormat = require("dateformat");
const EventEmitter = require("events");

const DEBUG = true;
const HOST = "127.0.0.1";

// hard coded strings and settings
const searchbarSelector = '._183ES'; //'.jN-F5';
const whatsappWebDomain = 'https://web.whatsapp.com';
const sendWhatsappWeb = 'https://web.whatsapp.com/send?phone=';
var userDataLocation = "/user_data_bn_";
const QRfileLocation = "/../erp_server/public/assets/QR.png";
const QRreloadSelector = '.HnNfm';
const groupClassSelector = '._19RFN'; //'._1wjpf';
const groupDetailsClassSelector = '._3V5x5';//'._1Iexl';//'._2zCDG';
const rightBarUnreadMessagesSelector = ".OUeyt";
const searchHeaderSelector = ".r7sRK"; //"._1AKfk";
const groupCreatedDateSelector = "._1qWhd"; //"._3GoJv";
const scrollButtomSelector = "._3KRbU"; //"._298R6";
const messageTopSelector = "._12pGw"; //".Tkt2p";
const pictureTopSelector = "._1RiwZ";
const videoTopSelector = ".t2_Ut";
const groupDetailsDivSelector = "._1Iexl";
const messageSelector = "[data-pre-plain-text]";
const senderSelector = "div._3Usvm";
const mainViewSelector = "._1_keJ"; //"._2nmDZ";
const messagesListSelector = "_1ays2"; //"_9tCEa";
const managementMessageSelector = "_1zGQT a7otO"; //"vW7d1 _3rjxZ";
const messageQuotedSelector = ".quoted-mention"; //"[class = quoted-mention]";
const refMsgSenderSelector = ".ZObjg"; //"[class = RZ7GO]";
const msgTextSelector = "._12pGw"; //"._3zb-j";
const messageButtonSelector = ".button";
const moreMembersSelector = '._2PSio'; //'._1jJLh';
const typeMessageSelector = "._13mgZ"; // "._2S1VP";
const sendMessageSelector = "._3M-N-"; // "._35EW6";
const sendToTitleSelector = '._19vo_ ._19RFN';
const linkSelector = '[class = grGJn][style = "height: 88px;"]';
const browserWidth = 1920 / 1.5;
const browserHeight = 1080 / 1.5;
const isheadless = false;
const checkForNewMessages = true;
const checkReferenceMessage = true;
const defaultNewMessagesNumber = 0; //TODO: change to default = 0 
const groupsJsonFile = '/groups.json';
const QRfileURL = "http://whatsapp-crawler.com/assets/QR.png";
const senderEmail = "aelon@cambium.co.il";
const senderPassword = "Elon9890";
const toEmailAddress = "aelon@cambium.co.il";
const sendAllGoodTo = '+972503006092';
const sendAllGoogMsg = 'All good!\nThe WhatsApp-Crawler runs perfecty.';
const sendAllGoodGroup = 'WAC';
const minute = 60000;
const loopInterval = minute * 10; // every 10 minutes
const waitBeforeCheckEmail = minute * 5; // 5 min

class MyEmitter extends EventEmitter { }
const myEmitter = new MyEmitter();

//global variables
var browser = {};
var page = {};
var flickEvent = {};

// TODO: read this array from server, external file, DB, or external node parameter
var groupsArray = [];

// main code
(async () => {
  // make new directory
  let num = 1;
  while (fs.existsSync(__dirname + userDataLocation + num)) {
    num++;
  }

  // setting chrome environment
  const browserOptions = {
    headless: isheadless, //so we can scan the QR code
    userDataDir: path.join(__dirname + userDataLocation + num), //so we can save session data from one run to another. full path due to a bug in headlesschrome 
    args: ['--no-sandbox']
  };

  try {
    browser = await puppeteer.launch(browserOptions);
    console.log(await browser.version());

    page = await browser.newPage();
    page.setCacheEnabled(false);
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3641.0 Safari/537.36');
    await page.setViewport({
      width: browserWidth,
      height: browserHeight,
      deviceScaleFactor: 2
    });

    // load WA and wait for log-in
    if (DEBUG) console.log('loading ' + whatsappWebDomain)
    await page.goto(whatsappWebDomain);

    //wait for class that appears only when logged in
    await loginCheck();

    console.log("END. Closing browser");
    if (isheadless) await browser.close();
  } catch (e) {
    if (DEBUG) console.log(e);
  }
})();

async function loginCheck() {
  try {
    await page.waitFor(searchbarSelector, {
      timeout: 15000
    });
    //TODO: add try-catch for error handling
    //TODO: handle the case of "whatsapp is open in another window"
    //TODO: send the QR screenshot so we can scan it headless
    if (DEBUG)
      console.log("logged-in");

    // Define a window.onCustomEvent function on the page.
    try {
      await page.exposeFunction('onCustomEvent', event => {
        if (event.target.includes('style="background-color: rgb(204, 204, 204);')) {
          flickEvent = event;
          myEmitter.emit('flick');
        }
      });
    } catch (e) {
      if (DEBUG) console.log('onCustomEvent already exist or error: ' + e.message);
    }

    // handle with dialog window for send validation links - leave site to send more messages
    page.on('dialog', async dialog => {
      await dialog.accept();
    });

    // read groups from groups.json
    groupsArray = await Object.keys(JSON.parse(fs.readFileSync(path.join(__dirname + groupsJsonFile), 'utf8')));

    let counterForSend = 0;
    while (true) {

      // writes the date the reading start
      let date = new Date();
      let zone = date.getTimezoneOffset();
      date.setHours((date.getHours()+(-1)*zone)%24);
      if (DEBUG) console.log("reading start at " + date.toString());

      // read groups 
      for (group of groupsArray) {
        await readGroup(group);
      }
      if (DEBUG) await console.log("\x1b[36m%s\x1b[0m", 'all groups were readen');

      //send whatsapp msg every 2 hours
      counterForSend++;
      if (counterForSend == 13)
        counterForSend = 0;

      // send validate messages
      await getValidationLinks(counterForSend);

      date = new Date();
      let zone = date.getTimezoneOffset();
      date.setHours((date.getHours()+(-1)*zone)%24);

      console.log("now " + date.toString() + "!\ni'm going to sleep for 10 minutes...");
      await page.waitFor(loopInterval);
    }
  } catch (e) {
    if (DEBUG)
      console.log('not logged-in or error: ' + e.message);
    // click the reload button if exists
    try {
      await page.waitFor(QRreloadSelector, {
        timeout: 1500
      }) // TODO: add try-catch for error handling
      // not working, using workaround below: await page.click('QRreloadSelector');
      await page.evaluate((QRreloadSelector) => document.querySelector(QRreloadSelector).click(), QRreloadSelector);
      await page.waitFor(2000); // time for QR regenerate

    } catch (e) { }

    await page.screenshot({
      path: path.join(__dirname + QRfileLocation)
    });
    await sendEmail();
    await page.waitFor(waitBeforeCheckEmail); // time for check email and login - 5 minutes
    await loginCheck();
  }
}

async function sendEmail() {
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: senderEmail,
      pass: senderPassword
    }
  });

  var mailOptions = {
    from: senderEmail,
    to: toEmailAddress,
    subject: 'Click on the link to login WhatsApp',
    text: QRfileURL
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      if (DEBUG) console.log(error);
    } else {
      if (DEBUG) console.log('Email sent to ' + toEmailAddress);
    }
  });
}

async function readGroup(groupName) {
  var promises = [];
  // triple click to select-all text in search bar
  await page.click(searchbarSelector, { clickCount: 3 });
  // search for group name
  await page.type(searchbarSelector, groupName);
  await page.waitFor(1000); // for typing to end

  try {
    await page.waitFor(searchHeaderSelector, { timeout: 5000 }); // wait for search to be done. TODO: find more rubust way to check

    // click on the result to open group (// TODO: What if I have 2?)
    groupSelector = groupClassSelector + '[title*="' + groupName + '"]';
    await page.waitFor(groupSelector) // TODO: add try-catch for error handling
    await page.click(groupSelector);

    // click to scroll to buttom
    try {
      await page.waitFor(scrollButtomSelector, { timeout: 3000 }) // TODO: add try-catch for error handling
      await page.click(scrollButtomSelector);
    }
    catch (e) { if (DEBUG) console.log("already scrolled to bottom"); }

    // click to see details
    groupDetailsSelector = groupDetailsClassSelector + " " + groupSelector;
    await page.waitFor(groupDetailsSelector); // TODO: add try-catch for error handling
    await page.click(groupDetailsSelector);

    // read group created date
    let groupCreatedDateString;
    await page.waitFor(groupCreatedDateSelector, { timeout: 10000 });
    groupCreatedDateString = await page.$eval(groupCreatedDateSelector, e => e.innerText);
    groupCreatedDateString = await setDateToCorrectFormat(groupCreatedDateString);
    if (DEBUG) await console.log(groupName + " creation date is " + groupCreatedDateString);

    // get last message ts
    var lastMessageData = await getLastMessage(groupName, groupCreatedDateString);
    if (!JSON.parse(lastMessageData).last_message_ts) {
      if (DEBUG) console.log("error last message", lastMessageData);
      return;
    }
    var lastMessage_ts = JSON.parse(lastMessageData).last_message_ts;
    if (DEBUG) console.log('last message ts', lastMessage_ts);

    //read messages
    let reach_last_ts = false;
    let bottom_ts = lastMessage_ts;
    let first_time = true;
    let while_cnt = 0;

    while (!reach_last_ts) {
      //catch messages

      while_cnt++;
      const messagesList = await page.evaluateHandle(selector => document.getElementsByClassName(selector)[0].children, messagesListSelector);
      const properties = await messagesList.getProperties();
      let messages = [];
      for (const property of properties.values()) {
        const element = property.asElement();
        if (element)
          messages.push(element);
      }
      if (DEBUG) console.log("read messages");

      // delete management messages
      let managementIndexes = [];
      for (elementIndex in messages) {
        let classname = await page.evaluate(el => el.getAttribute("class"), messages[elementIndex]);
        if (classname == managementMessageSelector)// it's management message
          managementIndexes.push(elementIndex);
      }
      for (number in managementIndexes)
        await messages.splice(managementIndexes[number] - number, 1);
      if (DEBUG) console.log("delete management messages");

      //read messages from bottom
      messages = messages.reverse();
      for (element of messages) {
        //generate message enevelope
        let envelope = await generateMessageEnvelope(groupName, groupCreatedDateString);

        //check timestamp of each message
        if (envelope.msg_id && envelope.ts < lastMessage_ts || while_cnt > 5) {
          reach_last_ts = true;
          break;
        }

        if (envelope.msg_id)// the message is text and wasn't deleted
        {
          //save timestamp of the bottom message
          if (first_time) {
            bottom_ts = envelope.ts;
            first_time = false;
          }

          //send message
          let p = sendMessage(JSON.parse(JSON.stringify(envelope)));
          promises.push(p);
        }
      }

      // scroll up to get more messages
      await page.evaluate(selector => { document.querySelector(selector).scrollTo(0, 0); }, mainViewSelector);
    }

    //success - > update lastTimestamp with bottom_ts
    try {
      let sendMsgPromises = await Promise.all(promises);
      let sendSuccess = true;
      for (var res of sendMsgPromises) {
        if (JSON.parse(res).warning)//message is comment
        {
          if (DEBUG) console.log('warning', JSON.parse(res).data);
          //try send it one more time
          let secondTimeP = await sendMessage(JSON.parse(res).data);
          if (JSON.parse(secondTimeP).error)
            sendSuccess = false;
        }
        else if (JSON.parse(res).error) {
          sendSuccess = false;
        }
      }
      if (sendSuccess)
        await sendTs(groupName, groupCreatedDateString, bottom_ts);
      else if (DEBUG)
        console.log('error in send messages');
    }
    catch (error) {
      if (DEBUG) console.log('error in send messages to server or error: ', error);
    }

    if (DEBUG) console.log('group named:"' + groupName + '" read is done');

    // for testing:
    if (DEBUG) {
      await page.waitFor(2000);
      groupName = await groupName.replace(/\//g, '.');
      await page.screenshot({ path: groupName + '.png' });
    }
  }
  catch (error) { if (DEBUG) console.log('no new messages in ' + groupName + " " + error.message); }
}

function sendTs(groupName, groupCreatedDateString, last_timestamp) {
  let options = {
    host: HOST,
    path: "/setLastMsgTs",
    method: "POST",
    port: 8080,
    headers: {
      "Content-Type": "application/json"
    },
    rejectUnauthorized: false
  };

  let body =
  {
    group_name: groupName,
    group_creation_time: groupCreatedDateString,
    timestamp: last_timestamp.toString()
  }

  var req = http.request(options, function (res) {
    var responseString = "";

    res.on("data", function (data) {
      responseString += data;
      // save all the data from response
    });
    res.on("end", function () {
      if (DEBUG) console.log('set ts successfully to ', last_timestamp);
      // print to console when response ends
    });
  });
  req.on('error', function (err) {
    if (DEBUG)
      console.log("\x1b[31m\x1b[0m", "error on set ts or error: " + err);
  });
  req.write(JSON.stringify(body));
  req.end();
}

async function setDateToCorrectFormat(groupCreatedDateString) {
  let timeArray = groupCreatedDateString.split(' ');
  let dateArray = timeArray[2].split('/');

  let year, month, day, hour, minutes;
  if ("אתמול" == dateArray[0]) {
    var yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    year = yesterday.getFullYear();
    month = yesterday.getMonth();
    day = yesterday.getDate();
    hour = timeArray[4].split(':')[0];
    minutes = timeArray[4].split(':')[1];
  }
  else if ("היום" == dateArray[0]) {
    var today = new Date();
    year = today.getFullYear();
    month = today.getMonth();
    day = today.getDate();
    hour = timeArray[3].substr(2).split(':')[0];
    minutes = timeArray[3].substr(2).split(':')[1];
  }
  else {
    year = dateArray[2];
    month = dateArray[1] - 1;
    day = dateArray[0];
    hour = timeArray[3].substr(2).split(':')[0];
    minutes = timeArray[3].substr(2).split(':')[1];
  }
  let date = new Date(year, month, day, hour, minutes);

  // TODO: check it for diffrenet timezone
  groupCreatedDateString = dateFormat(date.toLocaleString('en-US', {
    timeZone: "Asia/Jerusalem"
  }), "dd/mm/yyyy HH:MM");

  return groupCreatedDateString;
}

async function generateMessageEnvelope(groupName, groupCreatedDateString) {
  let envelope = {};
  envelope.group_name = groupName;
  envelope.group_creation_time = groupCreatedDateString;

  //check if the message has text and wasn't deleted
  try {
    await page.evaluate((el, selector) => el.querySelector(selector).innerHTML, element, messageTopSelector); //message is just text
    await page.evaluate((el, selector) => el.querySelector(selector).innerText, element, messageSelector); //massage wasn't deleted
  }
  catch (e) {
    try /* picture */ {
      await page.evaluate((el, selector) => el.querySelector(selector).innerHTML, element, pictureTopSelector); // message is a picture with text message
    }
    catch (e) {
      try /* video */ {
        await page.evaluate((el, selector) => el.querySelector(selector).innerHTML, element, videoTopSelector); // message is a video with text message
      }
      catch (e) {
        return envelope; /* message has not text or message was deleted */
      }
    }
  }
  envelope.msg = await page.evaluate(getMessageText, element, msgTextSelector);
  let metadata = await page.evaluate((el, selector) => el.querySelector(selector).getAttribute('data-pre-plain-text'), element, messageSelector);
  envelope.sender_id = metadata.replace(/ *\[[^\]]*]/g, '').replace(/[^\d.+]/g, '');
  envelope.ts = await getMsgTimestamp(metadata);
  envelope.msg_id = await crypto.createHash('md5').update(envelope.msg + envelope.sender_id + envelope.ts).digest("hex");

  //response to message
  envelope.reference_msg_id = '';
  if (checkReferenceMessage) {
    try {
      envelope.reference_msg_text = await page.evaluate(getInCommentText, element, messageQuotedSelector);
    }
    catch (e) {
      return envelope; //message is not a response to another message 
    }
    let reference_msg_sender_id = await page.evaluate((el, selector) => el.querySelectorAll(selector)[1].innerText, element, refMsgSenderSelector);
    envelope.reference_msg_sender_id = await reference_msg_sender_id.replace(/-/g, '').replace(/ /g, '');

    // For find reference message timestamp
    // Attach an mutation listener to page to capture a custom event on page element style change
    function listenFor() {
      return page.evaluate(() => {
        var mutationObserver = new MutationObserver(function (mutations) {
          mutations.forEach(async function (mutation) {
            await window.onCustomEvent({ type: mutation.type, target: mutation.target.outerHTML });
          });
        });

        mutationObserver.observe(document,
          {
            attributes: true,
            characterData: true,
            childList: true,
            subtree: true,
            attributeOldValue: true,
            characterDataOldValue: true,
            attributeFilter: ['style']
          });
      });
    }
    await listenFor();

    //find the element in the DOM
    var elementSelector = "[data-pre-plain-text = '" + metadata + "']";
    const currentElementOuterHTML = await page.evaluate((el) => el.outerHTML, element);
    try {
      var elementInDOM = await findElementInDOM(elementSelector, currentElementOuterHTML);
    }
    catch (e)//not found
    {
      if (DEBUG) console.log("\x1b[33m%s\x1b[0m", e.message);
      return envelope;
    }

    //click on the inner message to cause the page move to the message first occurrence and to flicker
    await page.evaluate((el, selector) => el.querySelector(selector).click(), elementInDOM, messageQuotedSelector);
    var waitToFlickPromise = true;
    await new Promise((resolve, reject) => {
      myEmitter.once('flick', function () {
        resolve();
      });
      setTimeout(() => {
        waitToFlickPromise = false;
        reject();
      }, 60000);
    }).then((value) => { }, (reason) => { if (DEBUG) console.log('no message flicked', reason); });

    if (!waitToFlickPromise)//not flick
    {
      if (DEBUG) console.log("\x1b[33m%s\x1b[0m", 'reference message was deleted');
      return await envelope;
    }

    //get inner message timestamp
    var innerMessageHTML = await flickEvent.target;
    var startIndex = await innerMessageHTML.indexOf('data-pre-plain-text') + 22;
    if (startIndex == 21) { return envelope; } //the original message is not just text  
    var endIndex = await innerMessageHTML.indexOf(']', startIndex);
    envelope.reference_msg_ts = await getMsgTimestamp(innerMessageHTML.substring(startIndex, endIndex));

    envelope.reference_msg_id = await crypto.createHash('md5').update(envelope.reference_msg_text + envelope.reference_msg_sender_id + envelope.reference_msg_ts).digest("hex");
  }
  return await envelope;
}

async function getMessageText(el, selector) {
  let textElement = el.querySelector(selector);
  let message = '';

  let emojis = textElement.querySelectorAll('img');
  if (emojis.length == 0) //no emojis
    message = textElement.innerText;
  else //there is emoji
  {
    let elementList = textElement.firstChild.childNodes;
    for (var child of elementList) {
      if (!child.tagName) //TEXT
        message += child.textContent;
      else if (child.tagName == "IMG") {
        let emoji = child.getAttribute("alt");

        if (emoji == "👍" || emoji == "👍🏻")//like yellow or light
          message += "<img src='https://web.whatsapp.com/img/986449f2ab46622e888b7c1f2ce0c477_w_e740-64.png' style='width:20px; height:20px'>";
        else if (emoji == "👎" || emoji == "👎🏻")//dislike yellow or light
          message += "<img src='https://web.whatsapp.com/img/986449f2ab46622e888b7c1f2ce0c477_w_e746-64.png' style='width:20px; height:20px'>";
        else
          message += '<>';
      }
      else if (child.tagName == "SPAN")//the message is just 1 or 2 emojis
      {
        let src = child.firstChild.getAttribute("src");
        message += "<img src='https://web.whatsapp.com" + src + "' style='width:20px; height:20px'>";
      }
    }
  }

  //multi line
  message = message.replace(/\n\n/g, '\n').replace(/ \n/g, '\n').replace(/\n /g, '\n');

  return message;
}

async function getInCommentText(el, selector) {
  let textElement = el.querySelector(selector);
  let message = '';

  let emojis = textElement.querySelectorAll('img');
  if (emojis.length == 0) //no emojis
  {
    message = textElement.innerText;
  }
  else //there is emoji
  {
    let elementList = textElement.childNodes;
    for (var child of elementList) {
      if (!child.tagName) //TEXT
        message += child.textContent;
      else if (child.tagName == "IMG") {
        let emoji = child.getAttribute("alt");

        if (emoji == "👍" || emoji == "👍🏻")//like yellow or light
          message += "<img src='https://web.whatsapp.com/img/986449f2ab46622e888b7c1f2ce0c477_w_e740-64.png' style='width:20px; height:20px'>";
        else if (emoji == "👎" || emoji == "👎🏻")//dislike yellow or light
          message += "<img src='https://web.whatsapp.com/img/986449f2ab46622e888b7c1f2ce0c477_w_e746-64.png' style='width:20px; height:20px'>";
        else
          message += '<>';
      }
    }
  }

  //multi line
  message = message.replace(/\n\n/g, '\n').replace(/ \n/g, '\n').replace(/\n /g, '\n');

  return message;
}

async function getMsgTimestamp(metadata) {
  let rawDate = metadata;
  if (metadata.includes("+"))
    rawDate = metadata.match(/ *\[[^\]]*]/g, "")[0].replace(/[\[\]']+/g, "");
  let timeArray = rawDate.split(",")[0].split(":");
  let dateArray = rawDate.split(" ")[1].split("/");
  return new Date(
    dateArray[2],
    dateArray[1] - 1,
    dateArray[0],
    timeArray[0],
    timeArray[1]
  ).getTime();
}

async function findElementInDOM(elementSelector, currentElementOuterHTML) {
  if (DEBUG) console.log("search element");

  //click to scroll to buttom
  try {
    await page.waitFor(scrollButtomSelector, { timeout: 3000 }); //TODO: add try-catch for error handling
    await page.click(scrollButtomSelector);
  }
  catch (e) { if (DEBUG) console.log("already scrolled to bottom"); }

  var elementInDOM;
  var counter = 0;
  do {
    counter = (await counter) + 1;
    if (DEBUG && counter % 100 == 0)
      console.log("\x1b[33m%s\x1b[0m", 'still searching..');

    const elementsList = await page.evaluateHandle(selector => document.querySelectorAll(selector), elementSelector);
    const properties = await elementsList.getProperties();
    for (const property of properties.values()) {
      const el = await property.asElement();
      if (el) {
        const elOuterHTML = await page.evaluate(el => el.outerHTML, el);
        if (currentElementOuterHTML.includes(elOuterHTML)) {
          elementInDOM = el;
        }
      }
    }

    //scroll up to get more messages
    await page.evaluate(selector => {
      document.querySelector(selector).scrollTo(0, 0);
    }, mainViewSelector);

  } while (!elementInDOM && counter < 300);

  if (!elementInDOM) throw Error("not found after " + counter + " searches");

  return elementInDOM;
}

async function getLastMessage(groupName, groupCreatedDateString) {
  var responseString;
  var p = new Promise((resolve, reject) => {
    let options =
    {
      host: HOST,
      path: "/getLastMsgTs",
      method: "POST",
      port: 8080,
      headers: {
        "Content-Type": "application/json"
      },
      rejectUnauthorized: false
    };
    var body =
    {
      "group_name": groupName,
      "group_creation_time": groupCreatedDateString
    }
    var req = http.request(options, function (res) {
      responseString = "";

      res.on("data", function (data) {
        responseString += data;
        // save all the data from response
      });
      res.on("end", function () {

        resolve();
        // print to console when response ends
      });
    });
    req.on('error', (err) => {
      if (DEBUG) console.log("\x1b[31m\x1b[0m", "didn't get last message : " + err);
      reject();
    });
    req.write(JSON.stringify(body));
    req.end();
  }).then((value) => { }, (reason) => { if (DEBUG) console.log('last message error', reason); });
  await p;
  return responseString;
}

function sendMessage(json) {
  return new Promise(function (resolve, reject) {
    //TODO: create new group when the group unknown
    let options = {
      host: HOST,
      path: "/classifyMsg",
      method: "POST",
      port: 8080,
      headers: {
        "Content-Type": "application/json"
      },
      rejectUnauthorized: false
    };
    var req = http.request(options, function (res) {
      var responseString = "";

      res.on("data", function (data) {
        responseString += data;
        // save all the data from response
      });
      res.on("end", function () {
        resolve(responseString);
        console.log(responseString);
        // print to console when response ends
      });
    });
    req.on('error', function (err) {
      resolve(err);
      if (DEBUG)
        console.log("\x1b[31m\x1b[0m", "reference message not found in DB or error: " + err);
    });
    req.write(JSON.stringify(json));
    req.end();
  })
}

async function sendAllGood() {
  //got to send message link
  await page.goto(sendWhatsappWeb + sendAllGoodTo);
  try {
    //wait for class that appears only when the navigation into chat success
    await page.waitFor(typeMessageSelector, { timeout: 15000 });

    //typing the message
    await page.click(typeMessageSelector, { clickCount: 3 });
    await page.type(typeMessageSelector, 'all good! the crawler runs perfect:)');

    //send it
    try {
      await page.waitFor(linkSelector, { timeout: 5000 }); //TODO: check the selector
    }
    catch (e) { }
    await page.click(sendMessageSelector);

    if (DEBUG) await console.log('send message to ', sendAllGoodTo);
  }
  catch (e) {
    if (DEBUG) console.log('error during sending all good msg. error: ' + e.message);
  }
}

async function getValidationLinks(counterForSend) {
  //request - get validation links and phone numbers
  let options =
  {
    host: HOST,
    path: "/getValidationLinks",
    method: "POST",
    port: 8080,
    headers: {
      "Content-Type": "application/json"
    },
    rejectUnauthorized: false
  };
  var validationLinks = "";
  var req = http.request(options, function (res) {
    res.on("data", function (data) {
      validationLinks += data;
    });
    res.on("end", async function () {
      validationLinks = JSON.parse(validationLinks);
      if (counterForSend == 12) {
        await validationLinks.push({
          sendto: sendAllGoodTo,
          link: sendAllGoogMsg,
          datatovalidate: '{"group_name": "' + sendAllGoodGroup + '"}'
        });
      }

      for (var message of validationLinks) {
        try {
          await sendValidationMessage(message);
        }
        catch (e) {
          if (DEBUG) console.log('error during sending validation msg. error: ' + e.message);
        }
      }
      if (DEBUG) await console.log("\x1b[36m%s\x1b[0m", 'all validation links were sent');
    });
    res.on("error", (e) => { console.log("\x1b[33m%s\x1b[0m", 'error in get validation link ', e); });
  });
  req.end();
}

async function readMessagesAccordingToNewMessagesNumber(groupName) {
  let newMessagesNumber = defaultNewMessagesNumber;
  if (checkForNewMessages) {
    //check if there are new messages
    let newMessagesIcon = await page.$(rightBarUnreadMessagesSelector);
    if (newMessagesIcon)
      newMessagesNumber = await page.$eval(rightBarUnreadMessagesSelector, e => e.innerText);
    else if (DEBUG)
      return console.log('no new messages in ' + groupName);
    if (DEBUG)
      await console.log(groupName + " have " + newMessagesNumber + " new messages");
  }

  // click on the result to open group (// TODO: What if I have 2?)
  groupSelector = groupClassSelector + '[title*="' + groupName + '"]';
  await page.waitFor(groupSelector) // TODO: add try-catch for error handling
  await page.click(groupSelector);

  // click to scroll to buttom
  try {
    await page.waitFor(scrollButtomSelector, {
      timeout: 3000
    }) // TODO: add try-catch for error handling
    await page.click(scrollButtomSelector);
  } catch (e) {
    if (DEBUG) console.log("already scrolled to bottom");
  }

  // click to see details
  groupDetailsSelector = groupDetailsClassSelector + " " + groupSelector;
  await page.waitFor(groupDetailsSelector); // TODO: add try-catch for error handling
  await page.click(groupDetailsSelector);

  // read group created date
  let groupCreatedDateString;
  if (groupName == 'הכרת מערכת הוואטסאפ') {
    groupCreatedDateString = '26/03/2019 10:46';
  }
  else {
    await page.waitFor(groupCreatedDateSelector, {
      timeout: 10000
    });
    groupCreatedDateString = await page.$eval(
      groupCreatedDateSelector,
      e => e.innerText
    );
    groupCreatedDateString = await setDateToCorrectFormat(
      groupCreatedDateString
    );
  }
  if (DEBUG)
    await console.log(
      groupName + " creation date is " + groupCreatedDateString
    );

  // read relevant (last new) messages
  let messages;
  let managementIndexes = [];
  do {
    // read messages
    if (DEBUG) console.log("read messages");
    const messagesList = await page.evaluateHandle(
      selector => document.getElementsByClassName(selector)[0].children,
      messagesListSelector
    );
    const properties = await messagesList.getProperties();
    messages = [];
    for (const property of properties.values()) {
      const element = property.asElement();
      if (element) messages.push(element);
    }

    // count management messages
    managementIndexes = [];
    for (elementIndex in messages) {
      let classname = await page.evaluate(
        el => el.getAttribute("class"),
        messages[elementIndex]
      );
      if (classname == managementMessageSelector)
        // it's management message
        managementIndexes.push(elementIndex);
    }

    // scroll up to get more messages
    await page.evaluate(selector => {
      document.querySelector(selector).scrollTo(0, 0);
    }, mainViewSelector);
  } while (messages.length - managementIndexes.length < newMessagesNumber);

  // delete management messages
  for (number in managementIndexes)
    await messages.splice(managementIndexes[number] - number, 1);

  // delete un-new messages
  if (messages.length > newMessagesNumber) {
    if (DEBUG) console.log("delete messages");
    messages = await messages.slice(messages.length - newMessagesNumber);
  }
}

async function sendValidationMessage(message) {
  var sendTo = message.sendto.substr(0, 4) + ' ' + message.sendto.substr(4, 2) + '-' + message.sendto.substr(6, 3) + '-' + message.sendto.substr(9, 4);
  var link = message.link;
  var groupName = JSON.parse(message.datatovalidate).group_name;

  // triple click to select-all text in search bar
  await page.click(searchbarSelector, { clickCount: 3 });
  // search for group name
  await page.type(searchbarSelector, groupName);
  await page.waitFor(1000); // for typing to end

  try {
    await page.waitFor(searchHeaderSelector, { timeout: 5000 }); // wait for search to be done. TODO: find more rubust way to check

    // click on the result to open group (// TODO: What if I have 2?)
    groupSelector = await groupClassSelector + '[title*="' + groupName + '"]';
    await page.waitFor(groupSelector) // TODO: add try-catch for error handling
    await page.click(groupSelector);

    // click to see details
    groupDetailsSelector = groupDetailsClassSelector + " " + groupSelector;
    await page.waitFor(groupDetailsSelector); // TODO: add try-catch for error handling
    await page.click(groupDetailsSelector);

    //click on the member
    try {
      await page.click('[title = "' + sendTo + '"]');
    }
    catch (e) {
      //show more members
      await page.waitFor(moreMembersSelector, { timeout: 15000 });
      await page.evaluate((selector) => { document.querySelector(selector).scrollTo(0, 0); }, moreMembersSelector);
      await page.click(moreMembersSelector);

      await page.click('[title = "' + sendTo + '"]');
    }

    await page.waitFor(10000);
    try {
      //check navigation success
      let title = await page.evaluate((selector) => document.body.querySelector(selector).getAttribute('title'), sendToTitleSelector);
      if (title != sendTo)
        title = title.substr(1, 16);
      if (title == sendTo) {
        //typing the message
        await page.click(typeMessageSelector, { clickCount: 3 });
        await page.waitFor(1000);
        await page.type(typeMessageSelector, '                                                         ' + link);

        //send it
        try {
          await page.waitFor(linkSelector, { timeout: 5000 }); //TODO: check the selector
        }
        catch (e) { }
        await page.click(sendMessageSelector); //send it
        if (DEBUG) await console.log('send message to ', sendTo);
      }
      else if (DEBUG)
        await console.log('navigate to ' + title + ' instead of ' + sendTo);
    } catch (e) { if (DEBUG) await console.log('title not found or error', e.message) }


  } catch (e) {
    if (DEBUG) await console.log('error send validation or error: ', e);
  }
}
