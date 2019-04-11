/**
 * http://usejsdoc.org/
 */

var config = require("./config");

process.env.GOOGLE_APPLICATION_CREDENTIALS = config.goobleCloud;

//Node Modules:
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var http = require("http").Server(app);
var https = require("https");
const fs = require("fs");

//parse application/x-www-form-urlencoded
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

//CORS middleware
var allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  next();
};

app.use(allowCrossDomain);

//Routes
require("./routes")(app);

var key = fs.readFileSync(config.httpsConfig.key);
var cert = fs.readFileSync(config.httpsConfig.crt);

const options = {
  key: key.toString("utf8"),
  cert: cert.toString("utf8")
};

http.listen(config.port, function() {
  console.log("App listening on port " + config.port + "!");
});

/*https.createServer(options, app).listen(config.port, function (a) {
    console.log('CORS-enabled web server listening on port ' + config.port);
})*/
