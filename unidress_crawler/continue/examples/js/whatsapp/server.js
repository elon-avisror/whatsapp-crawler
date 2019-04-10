var express = require("express"),
  bodyParser = require("body-parser");

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", function(request, response) {
  response.send(
    "Simple WhatsApp Webhook tester\nThere is no front-end, see server.js for implementation!"
  );
});

app.post("/webhook", function(request, response) {
  console.log("Incoming webhook: " + JSON.stringify(request.body));
  response.sendStatus(200);
});

var listener = app.listen(process.env.PORT, function() {
  console.log("Your app is listening on port " + listener.address().port);
});
