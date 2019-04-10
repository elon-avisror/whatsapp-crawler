/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ START UI classes ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

// 0 - initial scope
const APP = "app"; // V
const CHANGES = 13; // // init app changes V

// 1 - global scope (out of group)
const RIGHT_BAR = "RLfQR"; // V
const RIGHT_BAR_ELEMENT = "_2wP_Y"; // V
var observers = new Array(); // listening array V

// presentation: crawling, number of new messages
const RIGHT_BAR_UNREAD_MESSAGES = "OUeyt"; // V

// --> part a
const ELEMENT_CONTETNT = "_2FBdJ"; // V
const ELEMENT_CONTETNT_NAME = "_25Ooe"; // V
const ELEMENT_CONTETNT_TIME = "_3Bxar"; // V

// --> part b
const ELEMENT_TEXT = "_1AwDx"; // V
const ELEMENT_TEXT_LAST_MESSAGE = "_itDl"; // V
const ELEMENT_TEXT_NUMBER_OF_MESSAGES = "_3Bxar"; // V

const GROUP_NAME_EVEN_FIRSTMESSAGE_ODD = "_1wjpf"; // V

// 2 - local scope (in the group)
const CONVERSATION = "_9tCEa"; // V
const IMAGE_IN = 58;

// presentation: listening for new messages (unread messages)
const CONVERSATION_NEW_UNREAD_MESSAGES = "_1mq8g";

// type 2.a - system elements: date time, change group name etc.
const SYSTEM_ELEMENTS = "vW7d1 _3rjxZ"; // V
const DATE_SYSTEM_ELEMENT = "_3_7SH Zq3Mc"; // V
const CHANGE_GROUP_NAME = "_3_7SH Zq3Mc tail"; // V

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
const GENERAL_MESSAGE_FROM4 = "_111ze color-4 _2lc14"; // V
const GENERAL_MESSAGE_FROM5 = "_111ze color-5 _2lc14"; // V
const GENERAL_MESSAGE_FROM6 = "_111ze color-6 _2lc14"; // V
const GENERAL_MESSAGE_FROM7 = "_111ze color-7 _2lc14"; // V
const GENERAL_MESSAGE_FROM8 = "_111ze color-8 _2lc14"; // V
const GENERAL_MESSAGE_FROM9 = "_111ze color-9 _2lc14"; // V
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

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ START functions ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

function runAppListener(target, config) {
  let targetNode = document.getElementById(target);
  let noYes = false;
  let change = 0;

  // callback function to execute when mutations are observed
  var callback = function (mutationsList, observer) {
    for (var mutation of mutationsList) {
      // a child node has been added or removed, thats why twice (first flag)
      if (mutation.type === "childList" && noYes) {
        change++;
        noYes = false;

        // once!
        if (change === CHANGES) {
          let rightBar = document.getElementsByClassName(RIGHT_BAR);
          rightBarClassification(rightBar);
        }
      } else noYes = true;
    }
  };

  // create an observer instance linked to the callback function
  let observer = new MutationObserver(callback);

  // start observing the target node for configured mutations
  observer.observe(targetNode, config);

  return observer;
}

handleOut = num => {
  let groups = document.getElementsByClassName(
    GROUP_NAME_EVEN_FIRSTMESSAGE_ODD
  );
  let groupActualName = document.getElementsByClassName(GROUP_ACTUAL_NAME);

  let index = findGroupByName(groups, groupActualName);

  if (index !== undefined) {
    // getting the last message on that group
    let check = localStorage[groups[index].innerText + "OUT"];

    // if it was saved already
    if (check !== undefined)
      console.log(
        "saved localStorage of " +
        (groups[index].innerText + "OUT") +
        " is: " +
        localStorage[groups[index].innerText + "OUT"]
      );

    let groupCreatedDate = document.getElementsByClassName(GROUP_CREATED_DATE);

    if (groupCreatedDate != undefined) {
      groupCreatedDate = orderGroupCreatedDate(groupCreatedDate);

      let conversation = document.getElementsByClassName(CONVERSATION);

      // update
      localStorage[groups[index].innerText + "OUT"] = readNewMessage(
        conversation,
        groups[index],
        groupCreatedDate,
        conversation[0].children.length - num // the new messages that didn't read
      );
    } else
      console.log("ERROR: open description group first");

  } else
    console.log("ERROR: can't find the group index");
};

handleIn = () => {
  let groups = document.getElementsByClassName(
    GROUP_NAME_EVEN_FIRSTMESSAGE_ODD
  );
  let groupActualName = document.getElementsByClassName(GROUP_ACTUAL_NAME);

  let index = findGroupByName(groups, groupActualName);

  if (index !== undefined) {
    // getting the last message on that group
    let check = localStorage[groups[index].innerText + "IN"];

    // if it was saved already
    if (check !== undefined) {
      localStorage[groups[index].innerText + "IN"]; // if the unread was deleted + 1
      console.log(
        "saved localStorage of " +
        (groups[index].innerText + "IN") +
        " is: " +
        localStorage[groups[index].innerText + "IN"]
      );
    }

    let groupCreatedDate = document.getElementsByClassName(GROUP_CREATED_DATE);

    if (groupCreatedDate[0] != undefined) {
      groupCreatedDate = orderGroupCreatedDate(groupCreatedDate);

      // image changed and grown by some unpretictable number
      let conversation = document.getElementsByClassName(CONVERSATION);

      // update
      localStorage[groups[index].innerText + "IN"] = readNewMessage(
        conversation,
        groups[index],
        groupCreatedDate,
        conversation[0].children.length - 1 // the 1 new message that didn't read
      );
    } else
      console.log("ERROR: open description group first");

  } else
    console.log("ERROR: can't find the group index");
};

function runCrawlerListener(startApp, config) {
  let flag = true;
  let noYes = false;
  let numMsgRegx = /[0-9]+/s;
  var num;

  // callback function to execute when mutations are observed
  var callback = function (mutationsList, observer) {
    for (var mutation of mutationsList) {
      // a child node has been added or removed, thats why twice (first flag)
      if (mutation.type === "childList" && noYes) {
        // once!
        if (flag) {
          startApp.disconnect();
          flag = false;
        }

        // for next time
        noYes = false;

        // out of the group
        let newMessages = document.getElementsByClassName(
          CONVERSATION_NEW_UNREAD_MESSAGES
        );
        if (newMessages[0] !== undefined) {
          let getNum = newMessages[0].innerText.split();
          getNum.forEach(element => {
            let msg = element.search(numMsgRegx);
            num = element[msg];
          });

          // handle with messages out of the group
          handleOut(num);
        }

        // in the group
        else {
          // handle with messages in the group
          handleIn();
        }
      } else {
        noYes = true;
      }
    }
  };

  // create an observer instance linked to the callback function
  let observer = new MutationObserver(callback);

  // start observing the target node for configured mutations
  for (let i = 0; i < observers.length; i++)
    observer.observe(observers[i], config);

  return observer;
}

function findGroupByName(groups, groupActualName) {
  for (let i = 0; i < groups.length; i++) {
    if (groups[i].innerText === groupActualName[0].innerText) return i;
  }
}

function rightBarClassification(rightBar) {
  // work on the right-bar elements
  for (let i = 0; i < rightBar[0].children.length; i++) {
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    // from the right-bar, getting the child right-bar element
    let RB_element = rightBar[0].children[i];

    if (
      RB_element.className === RIGHT_BAR_ELEMENT &&
      RB_element.hasChildNodes()
    ) {

      // two types
      RB_element = RB_element.children[0].children[0].children[0];

      if (RB_element !== undefined && RB_element.hasChildNodes()) {
        if (RB_element.children[1] !== undefined)
          RB_element = RB_element.children[1];
        else
          RB_element = RB_element.children[0];
      }

      for (let j = 0; j < RB_element.children.length; j++) {
        // --> part a
        if (
          RB_element.children[j].className === ELEMENT_CONTETNT &&
          RB_element.hasChildNodes()
        ) {
          // name
          if (
            RB_element.children[j].children[0].className ===
            ELEMENT_CONTETNT_NAME &&
            RB_element.hasChildNodes()
          ) {
            let name = RB_element.children[j].children[0].children[0];

            // REFACTOR: check if this is a person or a group
            console.log("RB group name: " + name.innerText);
          }

          // time
          if (
            RB_element.children[j].children[1].className ===
            ELEMENT_CONTETNT_TIME &&
            RB_element.hasChildNodes()
          ) {
            let time = RB_element.children[j].children[1].children[0];
            if (time !== undefined)
              console.log("RB group time: " + time.innerText);
          }
        }

        // --> part b
        else if (
          RB_element.children[j].className === ELEMENT_TEXT &&
          RB_element.hasChildNodes()
        ) {
          // text
          if (
            RB_element.children[j].children[0].className ===
            ELEMENT_TEXT_LAST_MESSAGE &&
            RB_element.hasChildNodes()
          ) {
            let check = RB_element.children[j].children[0].children[0];

            if (check !== undefined) {
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
          }

          // number
          if (
            RB_element.children[j].children[1].className ===
            ELEMENT_TEXT_NUMBER_OF_MESSAGES &&
            RB_element.hasChildNodes()
          ) {
            let number = RB_element.children[j].children[1].children[0];
            console.log("RB group number: " + number.innerText);
            observers.push(number);
          }
        } else console.log("ERROR: another part");
      }
    }
  }
}

function order(REGX, Length, groupCreatedDate) {
  let str = groupCreatedDate[0].innerText;
  let index = str.search(REGX);
  if (str[index] !== undefined) {
    let res = "";
    for (let i = index; i < index + Length; i++) res += str[i];
    str = res;
  } else str = undefined;
  return str;
}

function createDate(day) {
  let today = new Date();
  let dd = today.getDate() - day;
  let mm = today.getMonth() + 1; //January is 0!
  let yyyy = today.getFullYear();

  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }

  today = mm + "/" + dd + "/" + yyyy;
  return today;
}

function orderGroupCreatedDate(groupCreatedDate) {
  let timeLength = 5;
  let dateLength = 10;
  let todayLength = 4;
  let yesterdayLength = 5;

  const timeREGX = /(([0-2]\d)\:([0-6]\d))/s;
  const dateREGX = /((([1-3]*\d)\/([0-1]*\d)\/([0-2]\d\d\d)))/s;
  const todayREGX = /(\ה\י\ו\ם)/s;
  const yesterdayREGX = /(\א\ת\מ\ו\ל)/s;

  let t = order(timeREGX, timeLength, groupCreatedDate);
  let d = order(dateREGX, dateLength, groupCreatedDate);

  if (d === undefined) {
    d = order(todayREGX, todayLength, groupCreatedDate);
    if (d === undefined) {
      d = order(yesterdayREGX, yesterdayLength, groupCreatedDate);
      if (d !== undefined) {
        switch (d) {
          case "היום":
            d = createDate(0);
          case "אתמול":
            d = createDate(1);
        }
      } else console.log("ERROR: cannot find the date properly.");
    }
  }

  // if there are spaces, clean them
  d = d.trim();
  t = t.trim();

  console.log("d:" + d);
  console.log("t:" + t);

  groupCreatedDate = d + " " + t;
  return groupCreatedDate;
}

function sendRegularJsonToServerSide(regularJsonFile) {
  const url = "https://unidress.cambium.co.il:8080/classifyMsg";
  const data = regularJsonFile;
  $.post(url, data, function (data, status) {
    console.log(data);
    console.log(status);
  });
}

function sendUniqueJsonToServerSide(uniqueJsonFile) {
  const url = "https://unidress.cambium.co.il:8080/changeGroupName";
  const data = uniqueJsonFile;
  $.post(url, data, function (data, status) {
    console.log(data);
    console.log(status);
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
            checkType.children[j].className === GENERAL_MESSAGE_FROM3 ||
            checkType.children[j].className === GENERAL_MESSAGE_FROM4 ||
            checkType.children[j].className === GENERAL_MESSAGE_FROM5 ||
            checkType.children[j].className === GENERAL_MESSAGE_FROM6 ||
            checkType.children[j].className === GENERAL_MESSAGE_FROM7 ||
            checkType.children[j].className === GENERAL_MESSAGE_FROM8 ||
            checkType.children[j].className === GENERAL_MESSAGE_FROM9) &&
          checkType.children[j].hasChildNodes()
        ) {
          // from
          let from = checkType.children[j].children[0];
          let nick = checkType.children[j].children[1];
          console.log("from: " + from.innerText);

          // JSON.sender_id
          sender_id = from.innerText;

          // if the user, by mistake, save a contact
          if (nick !== undefined) console.log("nick: " + nick.innerText);
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

function readNewMessage(conversation, groupActualName, groupCreatedDate, num) {
  if (groupActualName === undefined) groupActualName = "";
  else groupActualName = groupActualName.innerText;

  // initialize JSON files - for API messages
  let regularJsonFile = {
    msg: "",
    msg_id: "",
    ts: "",
    sender_id: "",
    group_name: groupActualName,
    group_creation_time: groupCreatedDate,
    reference_msg_id: ""
  };
  let uniqueJsonFile = {
    old: groupActualName,
    new: "",
    group_creation_time: groupCreatedDate
  };

  // bot sender id
  let myID = "+972 58-661-1632";

  // save the sender id for continuing messages
  let senderContinue = "";

  // work on the system elements
  for (let i = num; i < conversation[0].children.length; i++) {
    // flags
    let regular = (uninque = false);

    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    // from the conversation, getting the child message element
    let message = conversation[0].children[i];
    // type 2.a - V
    if (message.className === SYSTEM_ELEMENTS && message.hasChildNodes()) {
      for (let j = 0; j < message.children.length; j++) {
        if (message.children[j].className === DATE_SYSTEM_ELEMENT) {
          // getting type 2.a systemMessage element
          let systemMessage = message.children[0];
          console.log("system element: " + systemMessage.innerText);
        } else if (message.children[j].className === CHANGE_GROUP_NAME) {
          let changeMessage = message.children[1].children[2];
          if (changeMessage.getAttributeNames()[0] === "role") {
            console.log("change message: " + changeMessage.innerText);
            uniqueJsonFile.new = changeMessage.innerText;
            uninque = true;
          }
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
      sendRegularJsonToServerSide(regularJsonFile);
    } else if (uninque) {
      console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
      console.log("unique JSON:");
      console.log(uniqueJsonFile);
      sendUniqueJsonToServerSide(uniqueJsonFile);
    }
  }

  // index of the last readed message
  return conversation[0].children.length;
}

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ END functions ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ START crawling ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */

var once = true;

// options for the observer (which mutations to observe)
var config = {
  attributes: true,
  childList: true,
  subtree: true,
  characterDataOldValue: true
};

// initialize app page and listen to the application
var startApp = runAppListener(APP, config);

// wait for backgroung.js trigger
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "clicked_browser_action" && once) {

    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
    console.log("Listeners are on!");
    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");

    // if the browser will click again at the icon, it would'nt change anything
    once = false;

    // running page and listen to the new messages
    var startCrawler = runCrawlerListener(startApp, config);

    // continue: if I will want to disconnect the 'startCrawler' from some reason, just do startCrawler.disconnect()
  }
});

/*
// REFACTOR: to export this into the crawler in run-time for multi-machines (in the future)
var i = 1;
const groups = [{
    group: "צוות ב",
    group_creation_time: "26/11/2018 16:42"
  },
  {
    group: "WhatsApp Crawler 2",
    group_creation_time: "31/10/2018 11:50"
  },
  {
    group: "WhatsApp Crawler",
    group_creation_time: "10/12/2018 19:01"
  },
  {
    group: "מפעל ירושלים ושירות",
    group_creation_time: "13/2/2018 13:16"
  },
  {
    group: "תחבורה /שרות",
    group_creation_time: "11/11/2015 08:07"
  },
  {
    group: "מפעל בתי חולים",
    group_creation_time: "28/8/2013 19:30"
  },
  {
    group: "ירושלים וממשקים חיפה",
    group_creation_time: "11/10/2014 19:03"
  },
  {
    group: "חברת חשמל",
    group_creation_time: "25/2/2015 08:05"
  }
];

function insertDataTable(group_element, last_message, i) {
  let table = document.getElementById("demo");

  let row = table.insertRow(i);

  let num = row.insertCell(0);
  let group = row.insertCell(1);
  let group_creation_time = row.insertCell(2);
  let Sender_id = row.insertCell(3);
  let message = row.insertCell(4);
  let timestamp = row.insertCell(5);

  num.innerHTML = i;
  group.innerHTML = group_element.group;
  group_creation_time.innerHTML = group_element.group_creation_time;
  Sender_id.innerHTML = last_message.Sender_id;
  message.innerHTML = last_message.message;
  timestamp.innerHTML = last_message.timestamp;

  i += 1;
  return i;
}

groups.forEach(group_element => {
  const url = "https://unidress.cambium.co.il:8080/getLastMsg";
  $.post(url, group_element, function (last_message, status) {

    let flag = false;
    if (last_message.last_message !== undefined) {
      last_message = last_message.last_message;
      flag = true;
    } else if (last_message.error !== undefined)
      last_message = last_message.error;
    else
      console.log("ERROR!");

    console.log(group_element.group);
    console.log(last_message);
    console.log(status);

    if (last_message !== undefined && flag)
      i = insertDataTable(group_element, last_message, i);
  });
});
*/

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ END crawling ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */