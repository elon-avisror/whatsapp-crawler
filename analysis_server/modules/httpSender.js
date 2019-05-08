var request = require("request");
var config = require("../config");

exports.httpCall = function (data, callback) {
  var url = config.url;
  var route = data.route;
  var activate_debugger = "";
  activate_debugger = '?XDEBUG_SESSION_START=1';
  var options = {
    url: url + route + activate_debugger,
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  };

  console.log(options);
  request(options, function (err, httpResponse, body) {
    console.log(body);
    var body = JSON.parse(body);
    callback(body);
  });
};
