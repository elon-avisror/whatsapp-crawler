var config = require('../config');

analyzeCall =  function (msgData,issue_id,callbackRes){ 
    //get receiver name
    var receiver = '';
    var regex = config.recevierRegex;
    console.log('regex: ' + regex);
   // regex = /#(.+)#/gm;
   // console.log('regex2: ' + regex);
    var receiver = msgData.msg.match(regex);
    if(receiver !=null){
      receiver = receiver[0].replace("#", "");
      receiver = receiver.replace("#", ""); 
      receiver = receiver.trim(); 
    } 
    var erp = {
               'route':'call/registerCall',
               'receiver':receiver,
               'issue_id':issue_id,
               'sender_id':msgData.sender_id,
               'group_name': msgData.group_name, 
               'description':msgData.msg,
               'msg_id':msgData.msg_id,
               'status':'pendeing',
               'group_creation_time':msgData.group_creation_time,
               'reference_msg_id':'',
               'register_time':msgData.ts,
               'last_update':msgData.ts
    };


    callbackRes(erp);
}
analyzeComment = function (comment,first_word, callbackRes){
       var status = first_word;
          var erp = {
               'route':'call/status',
               'sender_id':comment.sender_id,
               'group_name': comment.group_name, 
               'msg':comment.msg,
               'msg_id':comment.msg_id,
               'reference_msg_id':comment.reference_msg_id,
               'group_creation_time':comment.group_creation_time,
               'status':status,
               'timestamp':comment.ts,
    };


    callbackRes(erp);
    
}
registerRegularMsg = function (msg,callbackRes){
    var erp = {
               'route':'call/message',
               'sender_id':msg.sender_id,
               'group_name': msg.group_name, 
               'group_creation_time':msg.group_creation_time,
               'msg':msg.msg,
               'msg_id':msg.msg_id,
               'reference_msg_id':msg.reference_msg_id,
               'timestamp':msg.ts,
    };
 callbackRes(erp);

}



exports.analyzeCall = analyzeCall;
exports.analyzeComment = analyzeComment;
exports.registerRegularMsg = registerRegularMsg;
