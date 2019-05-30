var analyze = require('../modules/analyze');
var updateDB = require('../modules/updateDB');
var httpSender = require('../modules/httpSender');
var tagger = require('../modules/tagger');
var validation = require('../modules/validation');

exports.getTablesData = function () {
  return new Promise((resolve, reject) => {
    var group_data = {
      'route': 'admin/getTablesData'
    }
    httpSender.httpCall(group_data, function (ans) { //make http request
      resolve(ans);
    });
  })
}

exports.classifyMsg = function (req, res) {
  //extract first word
  var msg = req.body.msg;
  var msgArray = msg.split(' ');
  var first_word = msgArray[0];
  //check if reference_msg_id
  if (req.body.reference_msg_id == "") {
    //check if new call
    //check if changing status WORD exists
    var newCall_issueArray = {
      1: { 0: 'בעיה' },
      2: { 0: 'משימה' },
      3: { 0: 'תלונה' },
      4: { 0: 'הודעה' },
      5: { 0: 'בקשה' },
      6: { 0: 'בירור' },
      7: { 0: 'בדיקה' },
      8: { 0: 'עדכון', 1: 'עידכון' }
    }
    var contains_word = false;
    loop_a: for (var is in newCall_issueArray) {
      var row = newCall_issueArray[is]
      loop_b: for (var is1 in row) {
        if (row[is1] == first_word) {
          contains_word = true;
          first_word = row[0];
          break loop_a;
        }
      }
    }
    if (contains_word) { // register as new call     
      var call_type_id = is;
      analyze.analyzeCall(req.body, call_type_id, function (ans) {
        if (ans.description != null) { //make http request
          httpSender.httpCall(ans, function (answer) {
            if (typeof (answer['new_message']) != 'undefined') { // proceed to tagger only if this is new message
              tagger.extractTags(answer);
            }
            res.send(answer);
          });
        } else {
          var error_msg = { "error": "some kind of problem. please check the data you send" }
          res.send(error_msg);
        }
      });
    } else { //registear as regular msg
      analyze.registerRegularMsg(req.body, function (ans) {
        if (ans.msg != null) {
          httpSender.httpCall(ans, function (answer) { //make http request
            if (typeof (answer['new_message']) != 'undefined') {// proceed to tagger only if this is new message
              tagger.extractTags(answer);
            }
            res.send(answer);
          });
        } else {
          var error_msg = { "error": "some kind of problem. please check the data you send" }
          res.send(error_msg);
        }
      });
    }
  } else {
    //check if changing status WORD exists
    var status_typeArray = {
      0: { 0: 'בוצע', 1: 'טופל' },
      1: { 0: 'בטיפול', 1: 'בהמתנה' },
      2: { 0: 'אעדכן מחר' }
    }
    var contains_word = false;
    for (var is in status_typeArray) {
      var row = status_typeArray[is]
      for (var is1 in row) {
        if (row[is1] == first_word) {
          contains_word = true;
          first_word = row[0];
        }
      }
    }
    if (contains_word) { //comment on a call
      analyze.analyzeComment(req.body, first_word, function (ans) {
        if (ans.msg != null) {
          httpSender.httpCall(ans, function (answer) { //make http request
            if (typeof (answer['new_message']) != 'undefined') {
              tagger.extractTags(answer);
            }

            res.send(answer);
          });
        } else {
          var error_msg = { "error": "some kind of problem. please check the data you send" }
          res.send(error_msg);
        }
      });
    } else { //registear as regular msg
      analyze.registerRegularMsg(req.body, function (ans) {
        if (ans.msg != null) {
          httpSender.httpCall(ans, function (answer) { //make http request 
            if (typeof (answer['new_message']) != 'undefined') {
              tagger.extractTags(answer);
            }
            res.send(answer);
          });
        } else {
          var error_msg = { "error": "some kind of problem. please check the data you send" }
          res.send(error_msg);
        }
      });
    }
  }
}

exports.changeGroupName = function (req, res) {
  if (req.body.old != undefined && req.body.new != undefined && req.body.group_creation_time != undefined) {
    updateDB.updateGroupId(req.body, function (ans) {
      //make http request
      if (ans.new != null) {
        httpSender.httpCall(ans, function (answer) {
          res.send(answer);
        });
      } else {
        var error_msg = { "error": "some kind of problem. please check the data you send" }
        res.send(error_msg);
      }

    });

  }
  var data = req.body;
}

exports.getLastMsgTs = function (req, res) {
  var group_data = {
    'route': 'call/getLastMsgTs',
    "group_name": req.body.group_name,
    "group_creation_time": req.body.group_creation_time
  }
  //make http request
  if (group_data.group_name != null && group_data.group_creation_time != null) {
    httpSender.httpCall(group_data, function (ans) {
      res.send(ans);
    });
  } else {
    var error_msg = { "error": "some kind of problem. please check the data you send" }
    res.send(error_msg);
  }
}

exports.setLastMsgTs = function (req, res) {
  var ts_data = {
    'route': 'call/setLastMsgTs',
    "group_name": req.body.group_name,
    "group_creation_time": req.body.group_creation_time,
    "timestamp": req.body.timestamp
  }
  //make http request
  if (ts_data.group_name != null && ts_data.group_creation_time != null && ts_data.timestamp != null) {
    httpSender.httpCall(ts_data, function (ans) {
      res.send(ans);
    });
  } else {
    var error_msg = { "error": "some kind of problem. please check the data you send" }
    res.send(error_msg);
  }
}

exports.setTag = function (data) {
  var tag_data = { 'route': 'admin/setTag' };
  for (var i = 0; i < data.length; i++) {
    var D = data[i];
    var tag = {
      "msg_id": D.msg_id,
      "tag_type": D.tag_type,
      "tag": D.tag,
      "probability": D.probability,
      "text": D.text,
      "msg": D.msg
    }
    tag_data[i] = tag;
  }

  //make http request
  if (tag_data['0'].msg_id != null) {
    httpSender.httpCall(tag_data, function (ans) {
      var msg_id = ans.msg_id;
      validation.validateTag(msg_id); //<----- VALIDATION
      return ans;
    });
  } else {
    var error_msg = { "error": "some kind of problem. please check the data you send" }
    return error_msg;
  }
}

exports.getTags = function (req, res) {
  var tag_data = {
    'route': 'admin/getTags',
    "ts": req.body.ts,
    "group_name": req.body.group_name
  }
  //make http request
  if (tag_data.ts != null && tag_data.group_name != null) {
    httpSender.httpCall(tag_data, function (ans) {
      res.send(ans);
    });
  } else {
    var error_msg = { "error": "some kind of problem. please check the data you send" }
    res.send(error_msg);
  }
}

exports.parseSCV = function (req, res) {
  var parse_data = {
    'route': 'admin/parseSCV'
  }
  httpSender.httpCall(parse_data, function (ans) { //make http request
    res.send(ans);
  });
}

exports.getValidationLinks = function (req, res) {
  var data = {
    'route': 'admin/getValidationLinks'
  }
  httpSender.httpCall(data, function (ans) {   //make http request
    res.send(ans);
  });

}

exports.Data_Validated = function (req, res) {
  console.log(req);
  var data = req.query;
  console.log(data);
  sub_issue_array = [];
  for (var k in data) {
    if (k.indexOf('sub_issue') > -1) {
      sub_issue_array.push(data[k]);
    }

  }

  var data = {
    'route': 'admin/Data_Validated',
    'msg_id': data.msg_id,
    'issue_id': data.issue,
    'sub_issue': sub_issue_array,
    'customer': data.customer,
    'receiver': data.receiver,
    'sender_id': data.sender_id,
    'group_id': data.group_id,
    'ts': Date.now()
  }
  httpSender.httpCall(data, function (ans) {   //make http request
    res.send(ans);
  });

}

exports.getDataToValidateByMsgId = function (req, res) {
  var data = {
    'route': 'admin/getDataToValidateByMsgId',
    'msg_id': req.body.msg_id
  }
  httpSender.httpCall(data, function (ans) {   //make http request
    res.send(ans);
  });
}

exports.getEntity = function (req, res) {
  var data = {
    'route': 'admin/getEntity',
    'entity': req.body.entity
  }
  httpSender.httpCall(data, function (ans) {   //make http request
    res.send(ans);
  });
}


exports.getValidated_data = function (req, res) {
  if (typeof (req.body.since) != "undefined" && typeof (req.body.until) != "undefined" && typeof (req.body.group_name) != "undefined") {
    var data = {
      'route': 'admin/getValidated_data',
      'since': req.body.since,
      'until': req.body.until,
      'group_name': req.body.group_name
    }
    httpSender.httpCall(data, function (ans) {   //make http request
      res.send(ans);
    });
  } else {
    res.send("missing params");
  }

}

exports.getWAGroups = function (req, res) {
  if (true) {
    var data = {
      'route': 'admin/getWAGroups',
    }
    httpSender.httpCall(data, function (ans) {   //make http request
      res.send(ans);
    });
  } else {
    res.send("missing params");
  }
}