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

        if (groupCreatedDate != undefined) {
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
            RB_element = RB_element.children[0].children[0].children[0].children[1];

            /*
            // REFACTOR another os
            if (RB_element === undefined)
              RB_element = RB_element.children[0].children[0].children[0].children[0];
              */

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
    const dateREGX = /((([0-3]\d)\/([0-1]\d)\/([0-2]\d\d\d)))/s;
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

    groupCreatedDate = d + " " + t;
    return groupCreatedDate;
}

function sendRegularJsonToServerSide(regularJsonFile) {
    const url = "https://unidress.cambium.co.il:8080/classifyMsg";
    const data = regularJsonFile;
    $.post(url, data, function (data, status) {
        console.log(`${data} and status is ${status}`);
    });
}

function sendUniqueJsonToServerSide(uniqueJsonFile) {
    const url = "https://unidress.cambium.co.il:8080/changeGroupName";
    const data = uniqueJsonFile;
    $.post(url, data, function (data, status) {
        console.log(`${data} and status is ${status}`);
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
    let senderContinue;

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

const {
    Builder,
    By,
    Key,
    until
} = require('selenium-webdriver');

// REFACTOR: let driver = await new Builder().forBrowser('chrome').'usingServer('http://localhost:4444/wd/hub')' for selenium-server-standalone
(async function run() {
    let driver = await new Builder().forBrowser('chrome').setChromeOptions().build();
    try {

        // set the domain
        await driver.get('https://web.whatsapp.com/');

        // set a cookie on the current domain
        driver.manage().addCookie("test", "cookie-1");

        // read the cookie
        driver.manage().getCookie('test').then(function (cookie) {
            console.log(cookie);
        });

        // get a page with the cookie
        driver.get('https://web.whatsapp.com/');


        await driver.wait(until.titleIs('webdriver - WhatsApp Crawler'), 100000000000000);

        var once = true;

        // options for the observer (which mutations to observe)
        var config = {
            attributes: true,
            childList: true,
            subtree: true,
            characterDataOldValue: true
        };

        // initialize app page and listen to the application
        startApp = runAppListener(APP, config);

        if (request.message === "clicked_browser_action" && once) {

            console.log("WORK");
            // options for the observer (which mutations to observe)
            var config = {
                attributes: true,
                childList: true,
                subtree: true,
                characterDataOldValue: true
            };

            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
            console.log("Listeners are on!");
            console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");

            // running page and listen to the new messages
            let startCrawler = runCrawlerListener(startApp, config);
        }

        console.log("RUN");
    } finally {
        console.log("QUIT");
        await driver.quit();
    }
})();

// continue: if I will want to disconnect the 'startCrawler' from some reason, just do startCrawler.disconnect()

/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ END crawling ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */