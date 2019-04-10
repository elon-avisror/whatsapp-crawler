// require md5 encryption
var md5 = require('md5');

// 3 - in-local scope (in the properties group)
let groupsDate = document.getElementsByClassName(GROUP_CREATED_DATE);
console.log("Made on: " + groupsDate[index].innerText);

// 2 - local scope (in the group)
let systemElements = document.getElementsByClassName(SYSTEM_ELEMENTS);
let extremeGeneralElements = document.getElementsByClassName(
    EXTREME_GENERAL_ELEMENTS
);
let generalElements = document.getElementsByClassName(GENERAL_ELEMENTS);
printGroupElements(
    groups,
    "WhatsApp Crawler 2",
    systemElements,
    extremeGeneralElements,
    generalElements
);

// need to get into id==="main"

const IMAGE = "_3q4NP _1Iexl";
const TYPE = "_2nmDZ";
const CHANGE = "_2EXPL";
const WHAT = "_3_7SH Zq3Mc";

// for conversations
let conversations = document.getElementsByClassName(GROUP_NAME);
openConversation(conversations);

// for text messages
let messages = document.getElementsByClassName(REGULAR_MESSAGE);
printText(messages);

// for responses
let responses = document.getElementsByClassName(RESPONSE_MESSAGE);
printText(responses);

// for new image conversation
let images = document.getElementsByClassName(IMAGE);
printText(images);

// open class
let types = document.getElementsByClassName(TYPE);
printText(types);

// change class (onclick property or somthing like that)
let changes = document.getElementsByClassName(CHANGE);
printText(changes);

// read from a text file in this (ocal) computer as kind of DB
const textFile = ["WhatsApp Crawler 2", "group-2", "group-3"];

function openConversation(conversations) {
    for (let i = 0; i < conversations.length; i++) {
        for (let j = 0; j < textFile.length; j++) {
            if (conversations[i].innerText === textFile[j]) {
                // validate
                console.log("VALLID: " + conversations[i].innerText);
            }
        }
    }
}