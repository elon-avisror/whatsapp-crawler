var fs = require("fs");
// var message = [date, subject, content];

/* open db/file.txt for read and ordering that file as an element message */
function parseFile() {
  const file = fs.readFileSync("../db/file.txt", "utf8");

  const messageBreak = "\r\n";
  let messagesArray = file.split(messageBreak); /* get an array of messages */
  console.log(messagesArray);

  parseArray(messagesArray);

  return file;
}

/* take an element message and take it's details */
function parseArray(messagesArray) {
  let id = 0;
  const rTitle = /(\[([1-3]*\d+)\.([1]*\d+)\.([1-2]*\d+\d+\d+)\, ([1-2]+\d+)\:([0-6]+\d+)\:([0-6]+\d+)\])/gm;
  const rFrom = /([א-ת]+[ ]*)+\:/gm;

  messagesArray.forEach(element => {
    let message = element.split(rTitle); /* get message information */
    message[0] = id++;

    let from = message[8].split(
      rFrom
    ); /* get who is the sender and his content */
    console.log("from: " + from);
    printMessage(message);
  });
}

/* print message details */
function printMessage(message) {
  console.log("mId: " + message[0]);
  console.log("title: " + message[1]);
  console.log("day: " + message[2]);
  console.log("month: " + message[3]);
  console.log("year: " + message[4]);
  console.log("hour: " + message[5]);
  console.log("min: " + message[6]);
  console.log("sec: " + message[7]);
  console.log("content: " + message[8]);
}

const pf = parseFile();
fs.writeFileSync("../db/file.txt", pf);