var httpSender = require('../modules/httpSender');

validateTag =  function (msg_id){  
      var data = {
      "route":"admin/validateTag",
      "msg_id":msg_id 
     } 
            httpSender.httpCall(data, function(ans){ //make http request
            });        
}

exports.validateTag = validateTag;