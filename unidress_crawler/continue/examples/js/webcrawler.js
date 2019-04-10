/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ START UI classes ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

// 1 - global scope (out of group)
const RIGHT_BAR = "RLfQR"; // V
const RIGHT_BAR_ELEMENT = "_2wP_Y"; // V

// --> part a
const ELEMENT_CONTETNT = "_2FBdJ"; // V
const ELEMENT_CONTETNT_NAME = "_25Ooe"; // V
const ELEMENT_CONTETNT_TIME = "_3Bxar"; // V

// --> part b
const ELEMENT_TEXT = "_1AwDx"; // V
const ELEMENT_TEXT_LAST_MESSAGE = "_itDl"; // V
const ELEMENT_TEXT_NUMBER_OF_MESSAGES = "_3Bxar"; // V

const GROUP_NAME0_FIRSTMESSAGE1 = "_1wjpf"; // V (REFACTOR)

// 2 - local scope (in the group)
const CONVERSATION = "_9tCEa"; // V

// type 2.a - system elements: date time, change group name etc.
const SYSTEM_ELEMENTS = "vW7d1 _3rjxZ"; // V
const DATE_SYSTEM_ELEMENT = "_3_7SH Zq3Mc"; // V
const CHANGE_GROUP_NAME = "_3_7SH Zq3Mc tail";

// type 2.b - message elements: text message, response text message (OTHER=costumers, MY=bot)
const GENERAL_ELEMENTS = "vW7d1 _1nHRW"; // V
const EXTREME_GENERAL_ELEMENTS = "vW7d1"; // V
const DETAILS = "Tkt2p"; // V

// --> level 1 - message type (OTHER_FISRT, OTHER_CONTINUE, MY_FIRST, MY_CONTINUE)
const OTHER_FIRST_MESSAGE = "_3_7SH _3DFk6 message-in tail"; // V
const OTHER_CONTINUE_MESSAGE = "_3_7SH _3DFk6 message-in"; // V
const MY_FIRST_MESSAGE = "_3_7SH _3DFk6 message-out tail"; // V
const MY_CONTINUE_MESSAGE = "_3_7SH _3DFk6 message-out"; // V

// --> level 2
const GENERAL_MESSAGE_FROM1 = "_111ze color-1 _2lc14"; // V
const GENERAL_MESSAGE_FROM2 = "_111ze color-2 _2lc14"; // V
const GENERAL_MESSAGE_FROM3 = "_111ze color-3 _2lc14"; // V

// CHECK IN THE FUTURE
const GENERAL_MESSAGE_FROM4 = "_111ze color-4 _2lc14";
const GENERAL_MESSAGE_FROM5 = "_111ze color-5 _2lc14";
const GENERAL_MESSAGE_FROM6 = "_111ze color-6 _2lc14";
const GENERAL_MESSAGE_FROM7 = "_111ze color-7 _2lc14";
const GENERAL_MESSAGE_FROM8 = "_111ze color-8 _2lc14";
const GENERAL_MESSAGE_FROM9 = "_111ze color-9 _2lc14";
// --------------------

const GENERAL_FIRST_MESSAGE_CONTENT = "_3Usvm copyable-text"; // V
const GENERAL_CONTINUE_MESSAGE_CONTENT = "copyable-text"; // V
const GENERAL_MESSAGE_TIME = "_2f-RV"; // V

// --> level 3 - type 2.b
const MESSAGE_TEXT = "_3zb-j ZhF0n"; // V
// --> level 3 - type 2.c
const RESPONSE_TEXT = "_3CVlE"; // V

// 3 - in-local scope (in the properties group)
const GROUP_ACTUAL_NAME = "_2S1VP copyable-text selectable-text"; // V
const GROUP_CREATED_DATE = "_3GoJv"; // V

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ END UI classes ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ START MD5 functions ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

/*
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Copyright (C) Paul Johnston 1999 - 2000.
 * Updated by Greg Holt 2000 - 2001.
 * See http://pajhome.org.uk/site/legal.html for details.
 */

/*
 * Convert a 32-bit number to a hex string with ls-byte first
 */
var hex_chr = "0123456789abcdef";

function rhex(num) {
  str = "";
  for (j = 0; j <= 3; j++)
    str +=
    hex_chr.charAt((num >> (j * 8 + 4)) & 0x0f) +
    hex_chr.charAt((num >> (j * 8)) & 0x0f);
  return str;
}

/*
 * Convert a string to a sequence of 16-word blocks, stored as an array.
 * Append padding bits and the length, as described in the MD5 standard.
 */
function str2blks_MD5(str) {
  nblk = ((str.length + 8) >> 6) + 1;
  blks = new Array(nblk * 16);
  for (i = 0; i < nblk * 16; i++) blks[i] = 0;
  for (i = 0; i < str.length; i++)
    blks[i >> 2] |= str.charCodeAt(i) << ((i % 4) * 8);
  blks[i >> 2] |= 0x80 << ((i % 4) * 8);
  blks[nblk * 16 - 2] = str.length * 8;
  return blks;
}

/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */
function add(x, y) {
  var lsw = (x & 0xffff) + (y & 0xffff);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return (msw << 16) | (lsw & 0xffff);
}

/*
 * Bitwise rotate a 32-bit number to the left
 */
function rol(num, cnt) {
  return (num << cnt) | (num >>> (32 - cnt));
}

/*
 * These functions implement the basic operation for each round of the
 * algorithm.
 */
function cmn(q, a, b, x, s, t) {
  return add(rol(add(add(a, q), add(x, t)), s), b);
}

function ff(a, b, c, d, x, s, t) {
  return cmn((b & c) | (~b & d), a, b, x, s, t);
}

function gg(a, b, c, d, x, s, t) {
  return cmn((b & d) | (c & ~d), a, b, x, s, t);
}

function hh(a, b, c, d, x, s, t) {
  return cmn(b ^ c ^ d, a, b, x, s, t);
}

function ii(a, b, c, d, x, s, t) {
  return cmn(c ^ (b | ~d), a, b, x, s, t);
}

/*
 * Take a string and return the hex representation of its MD5.
 */
function calcMD5(str) {
  x = str2blks_MD5(str);
  a = 1732584193;
  b = -271733879;
  c = -1732584194;
  d = 271733878;

  for (i = 0; i < x.length; i += 16) {
    olda = a;
    oldb = b;
    oldc = c;
    oldd = d;

    a = ff(a, b, c, d, x[i + 0], 7, -680876936);
    d = ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = ff(c, d, a, b, x[i + 10], 17, -42063);
    b = ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = ff(b, c, d, a, x[i + 15], 22, 1236535329);

    a = gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = gg(b, c, d, a, x[i + 0], 20, -373897302);
    a = gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = gg(b, c, d, a, x[i + 12], 20, -1926607734);

    a = hh(a, b, c, d, x[i + 5], 4, -378558);
    d = hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = hh(d, a, b, c, x[i + 0], 11, -358537222);
    c = hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = hh(b, c, d, a, x[i + 2], 23, -995338651);

    a = ii(a, b, c, d, x[i + 0], 6, -198630844);
    d = ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = ii(b, c, d, a, x[i + 9], 21, -343485551);

    a = add(a, olda);
    b = add(b, oldb);
    c = add(c, oldc);
    d = add(d, oldd);
  }
  return rhex(a) + rhex(b) + rhex(c) + rhex(d);
}
/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ START MD5 functions ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ START functions ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

function findGroupByName(groups, group) {
  for (let i = 0; i < groups.length; i += 2) {
    if (groups[i].innerText === group) return i;
  }
}

function findGroupByFirstMessage(groups, message) {
  for (let i = 1; i < groups.length; i += 2) {
    if (groups[i].innerText === message) return i;
  }
}

function rightBarClassification(rightBar) {

  // work on the right-bar elements
  for (let i = 0; i < rightBar[1].children.length; i++) {
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    // from the right-bar, getting the child right-bar element
    let RB_element = rightBar[1].children[i];

    if (RB_element.className === RIGHT_BAR_ELEMENT && RB_element.hasChildNodes()) {
      RB_element = ((RB_element.children[0]).children[0]).children[1];

      for (let j = 0; j < RB_element.children.length; j++) {

        // --> part a
        if (RB_element.children[j].className === ELEMENT_CONTETNT && RB_element.hasChildNodes()) {

          // name
          if ((RB_element.children[j]).children[0].className === ELEMENT_CONTETNT_NAME && RB_element.hasChildNodes()) {
            let name = ((RB_element.children[j]).children[0]).children[0];
            console.log("RB group name: " + name.innerText);
          }

          // time
          if ((RB_element.children[j]).children[1].className === ELEMENT_CONTETNT_TIME && RB_element.hasChildNodes()) {
            let time = ((RB_element.children[j]).children[1]).children[0];
            console.log("RB group time: " + time.innerText);
          }
        }

        // --> part b
        else if (RB_element.children[j].className === ELEMENT_TEXT && RB_element.hasChildNodes()) {
          // text
          if ((RB_element.children[j]).children[0].className === ELEMENT_TEXT_LAST_MESSAGE && RB_element.hasChildNodes()) {
            let check = ((RB_element.children[j]).children[0]).children[0];

            if (check.children.length === 2 && check.hasChildNodes()) {
              let sender = check.children[0];
              let text = check.children[1];
              console.log("RB group sender: " + sender.innerText);
              console.log("RB group text: " + text.innerText);
            } else {
              let sender = check.children[0];
              console.log("RB group sender: " + sender.innerText);
            }
          }

          // number
          if ((RB_element.children[j]).children[1].className === ELEMENT_TEXT_NUMBER_OF_MESSAGES && RB_element.hasChildNodes()) {
            let number = ((RB_element.children[j]).children[1]).children[0];
            console.log("RB group number: " + number.innerText);
          }
        }
      }
    }
  }
}

function sendRegularJsonToServerSide(regularJsonFile) {
  $.ajax({
    method: "POST",
    url: "http://35.196.159.149:8080/analyze",
    data: {
      regularJsonFile
    }
  }).done(function () {
    alert("regularJsonFile: data saved!");
  });
}

function sendUniqueJsonToServerSide(uniqueJsonFile) {
  $.ajax({
    method: "POST",
    url: "http://35.196.159.149:8080/changeGroupName",
    data: {
      uniqueJsonFile
    }
  }).done(function () {
    alert("uniqueJsonFile: data saved!");
  });
}

function updateRegularJsonFile(
  regularJsonFile,
  msg,
  sender_id,
  jsonTime,
  jsonText,
  jsonSender
) {
  regularJsonFile.msg = msg;
  regularJsonFile.msg_id = calcMD5(msg + sender_id + jsonTime);
  regularJsonFile.ts = Date.now();
  regularJsonFile.sender_id = sender_id;
  if (jsonSender !== "")
    regularJsonFile.reference_msg_id = calcMD5(
      jsonText + jsonSender + jsonTime
    );
  return regularJsonFile;
}

function otherMessage(checkType, regularJsonFile) {
  // initialize
  let msg = (sender_id = group_name = group_creation_time = jsonSender = jsonText = jsonTime =
    "");

  for (let i = 0; i < checkType.children.length; i++) {
    if (
      checkType.children[i].className === DETAILS &&
      checkType.children[i].hasChildNodes()
    ) {
      checkType = checkType.children[i];
      for (let j = 0; j < checkType.children.length; j++) {
        if (
          (checkType.children[j].className === GENERAL_MESSAGE_FROM1 ||
            checkType.children[j].className === GENERAL_MESSAGE_FROM2 ||
            checkType.children[j].className === GENERAL_MESSAGE_FROM3) &&
          checkType.children[j].hasChildNodes()
        ) {
          // from
          let from = checkType.children[j].children[0];
          let nick = checkType.children[j].children[1];
          console.log("from: " + from.innerText);

          // JSON.sender_id
          sender_id = from.innerText;

          console.log("nick: " + nick.innerText);
        } else if (
          (checkType.children[j].className === GENERAL_FIRST_MESSAGE_CONTENT ||
            checkType.children[j].className ===
            GENERAL_CONTINUE_MESSAGE_CONTENT) &&
          checkType.children[j].hasChildNodes()
        ) {
          // content
          let messageContent = checkType.children[j];
          console.log("content: " + messageContent.dataset.prePlainText);

          for (let k = 0; k < messageContent.children.length; k++) {
            // type 2.c
            if (
              messageContent.children[k].className === RESPONSE_TEXT &&
              messageContent.children[k].hasChildNodes()
            ) {
              let refferenceSender =
                messageContent.children[0].children[0].children[1].children[1]
                .children[0].children[0];
              let refferenceText =
                messageContent.children[0].children[0].children[1].children[1]
                .children[0].children[1];

              console.log("response sender: " + refferenceSender.innerText);
              console.log("response text: " + refferenceText.innerText);

              // JSON.reference_msg_id
              jsonSender = refferenceSender.innerText;
              jsonText = refferenceText.innerText;
            } else if (
              messageContent.children[k].className === MESSAGE_TEXT &&
              messageContent.children[k].hasChildNodes()
            ) {
              let text = messageContent.children[k];
              console.log("text: " + text.innerText);

              // JSON.msg
              msg = text.innerText;
            }
          }
        }

        // last handled
        else if (
          checkType.children[j].className === GENERAL_MESSAGE_TIME &&
          checkType.children[j].hasChildNodes()
        ) {
          // time
          let time = checkType.children[j];
          console.log("time: " + time.innerText);

          // JSON.reference_msg_id
          jsonTime = time;
        }
      }
    }
  }

  // update regularJsonFile
  regularJsonFile = updateRegularJsonFile(
    regularJsonFile,
    msg,
    sender_id,
    jsonTime,
    jsonText,
    jsonSender
  );

  return regularJsonFile;
}

function myMessage(checkType, regularJsonFile) {
  // initialize
  let msg = (sender_id = group_name = group_creation_time = jsonSender = jsonText = jsonTime =
    "");

  for (let i = 0; i < checkType.children.length; i++) {
    if (
      checkType.children[i].className === DETAILS &&
      checkType.children[i].hasChildNodes()
    ) {
      checkType = checkType.children[i];
      for (let j = 0; j < checkType.children.length; j++) {
        if (
          checkType.children[j].className ===
          GENERAL_CONTINUE_MESSAGE_CONTENT &&
          checkType.children[j].hasChildNodes()
        ) {
          // content
          let messageContent = checkType.children[j];
          console.log("content: " + messageContent.dataset.prePlainText);

          for (let k = 0; k < messageContent.children.length; k++) {
            // type 2.c
            if (
              messageContent.children[k].className === RESPONSE_TEXT &&
              messageContent.children[k].hasChildNodes()
            ) {
              let refferenceSender =
                messageContent.children[0].children[0].children[1].children[1]
                .children[0].children[0];
              let refferenceText =
                messageContent.children[0].children[0].children[1].children[1]
                .children[0].children[1];

              console.log("response sender: " + refferenceSender.innerText);
              console.log("response text: " + refferenceText.innerText);

              // JSON.reference_msg_id
              jsonSender = refferenceSender.innerText;
              jsonText = refferenceText.innerText;
            } else if (
              messageContent.children[k].className === MESSAGE_TEXT &&
              messageContent.children[k].hasChildNodes()
            ) {
              let text = messageContent.children[k];
              console.log("text: " + text.innerText);

              // JSON.msg
              msg = text.innerText;
            }
          }
        }

        // last handled
        else if (
          checkType.children[j].className === GENERAL_MESSAGE_TIME &&
          checkType.children[j].hasChildNodes()
        ) {
          // time
          let time = checkType.children[j];
          console.log("time: " + time.innerText);

          // JSON.reference_msg_id
          jsonTime = time.innerText;
        }
      }
    }
  }

  // update regularJsonFile
  regularJsonFile = updateRegularJsonFile(
    regularJsonFile,
    msg,
    sender_id,
    jsonTime,
    jsonText,
    jsonSender
  );

  return regularJsonFile;
}

function conversationClassification(
  conversation,
  groupActualName,
  groupCreatedDate
) {
  // initialize JSON files - for API messages
  let regularJsonFile = {
    msg: "",
    msg_id: "",
    ts: "",
    sender_id: "",
    group_name: groupActualName[0].innerText,
    group_creation_time: groupCreatedDate[0].innerText,
    reference_msg_id: ""
  };
  let uniqueJsonFile = {
    old: groupActualName[0].innerText,
    new: "",
    created_time: groupCreatedDate[0].innerText
  };

  // bot sender id
  let myID = "+972 58-661-1632";

  // save the sender id for continuing messages
  let senderContinue;

  // work on the system elements
  for (let i = 0; i < conversation[0].children.length; i++) {
    // flags
    let regular = (uninque = false);

    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    // from the conversation, getting the child message element
    let message = conversation[0].children[i];
    // type 2.a - V
    if (message.className === SYSTEM_ELEMENTS && message.hasChildNodes()) {
      if (message.children[0].className === DATE_SYSTEM_ELEMENT) {
        // getting type 2.a systemMessage element
        let systemMessage = message.children[0];
        console.log("system element: " + systemMessage.innerText);
      } else if (message.children[1].className === CHANGE_GROUP_NAME) {
        let changeMessage = message.children[1].children[2];
        if (changeMessage.getAttributeNames()[0] === "role") {
          console.log("change message: " + changeMessage.innerText);
          uniqueJsonFile.new = changeMessage.innerText;
          uninque = true;
        }
      }
    }

    // type 2.b and 2.c
    else if (
      (message.className === GENERAL_ELEMENTS ||
        message.className === EXTREME_GENERAL_ELEMENTS) &&
      message.hasChildNodes()
    ) {
      let checkType = message.children[1];
      // other first message
      if (
        checkType.className === OTHER_FIRST_MESSAGE &&
        checkType.hasChildNodes()
      ) {
        console.log("other first message:");
        regularJsonFile = otherMessage(checkType, regularJsonFile);
        senderContinue = regularJsonFile.sender_id;
        regular = true;
      }

      // other continue messages
      else if (
        checkType.className === OTHER_CONTINUE_MESSAGE &&
        checkType.hasChildNodes()
      ) {
        console.log("other continue message:");
        regularJsonFile = otherMessage(checkType, regularJsonFile);
        regularJsonFile.sender_id = senderContinue;
        regular = true;
      }

      // my first messages
      else if (
        checkType.className === MY_FIRST_MESSAGE &&
        checkType.hasChildNodes()
      ) {
        console.log("my first message:");
        regularJsonFile = myMessage(checkType, regularJsonFile);
        regularJsonFile.sender_id = myID;
        regular = true;
      }

      // my continue messages
      else if (
        checkType.className === MY_CONTINUE_MESSAGE &&
        checkType.hasChildNodes()
      ) {
        console.log("my continue message:");
        regularJsonFile = myMessage(checkType, regularJsonFile);
        regularJsonFile.msg = myID;
        regular = true;
      }
    }
    if (regular) {
      console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
      console.log("regular JSON:");
      console.log(regularJsonFile);
      // sendRegularJsonToServerSide(regularJsonFile);
    } else if (uninque) {
      console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
      console.log("unique JSON:");
      console.log(uniqueJsonFile);
      // sendUniqueJsonToServerSide(uniqueJsonFile);
    }
  }
}

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ END functions ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ START crawling ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

// 1 - global scope (out of group)
let groups = document.getElementsByClassName(GROUP_NAME0_FIRSTMESSAGE1);
let index = findGroupByName(groups, "WhatsApp Crawler 2");
console.log("group name: " + groups[index].innerText);

let rightBar = document.getElementsByClassName(RIGHT_BAR);
rightBarClassification(rightBar);

// 3 - in-local scope (in the properties group)
let groupActualName = document.getElementsByClassName(GROUP_ACTUAL_NAME);
console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
console.log("group details:");
console.log(groupActualName[0].innerText);
let groupCreatedDate = document.getElementsByClassName(GROUP_CREATED_DATE);
console.log(groupCreatedDate[0].innerText);

// 2 - local scope (in the group)
let conversation = document.getElementsByClassName(CONVERSATION);
conversationClassification(conversation, groupActualName, groupCreatedDate);

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ END crawling ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */