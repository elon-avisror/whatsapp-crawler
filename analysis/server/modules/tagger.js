var analysis = require("../api/analysis.js");
const Dictionary = require("../tagger/Dictionary.js");

var cache;
async function onrun() {
  try {
    cache = await analysis.getTablesData();
  } catch (e) {
    console.error("onrun", e);
  }
  setInterval(async () => {
    try {
      cache = await analysis.getTablesData();
    } catch (e) {
      console.error("onrun interval", e);
    }
  }, 86400000);
}
var finish;
async function extractTags(input) {
  try {
    if (typeof finish === "undefined") {
      finish = onrun();
    }
    await finish;
    var a = cache;
    var mydict = new Dictionary();
    for (var i = 0; i < a.length; i++) {
      mydict.addTags(a[i]); //creating "pipes" by probability
    }
    var tags = mydict.textToTags(input.new_message); //finding match from message & tagging
    if (tags.length > 0) analysis.setTag(tags);
  } catch (e) {
    console.error("extractTags", e);
  }
}

exports.extractTags = extractTags;
