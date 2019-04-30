/**
 * http://usejsdoc.org/
 */

var analysisApi = require("./api/analysis");

module.exports = function (app) {
  app.post("/getWAGroups", function (req, res, next) {
    analysisApi.getWAGroups(req, res);
  });

  app.post("/getValidated_data", function (req, res, next) {
    analysisApi.getValidated_data(req, res);
  });

  app.get("/Data_Validated", function (req, res, next) {
    analysisApi.Data_Validated(req, res);
  });

  app.post("/getEntity", function (req, res, next) {
    analysisApi.getEntity(req, res);
  });

  app.post("/getDataToValidateByMsgId", function (req, res, next) {
    analysisApi.getDataToValidateByMsgId(req, res);
  });

  app.post("/getValidationLinks", function (req, res, next) {
    analysisApi.getValidationLinks(req, res);
  });

  app.post("/classifyMsg", function (req, res, next) {
    analysisApi.classifyMsg(req, res);
  });

  app.get("/test", function (req, res, next) {
    res.send("hi");
  });

  app.post("/getLastMsg", function (req, res, next) {
    analysisApi.getLastMsg(req, res);
  });

  app.post("/changeGroupName", function (req, res, next) {
    analysisApi.changeGroupName(req, res);
  });

  app.post("/getTags", function (req, res, next) {
    analysisApi.getTags(req, res);
  });

  app.post("/getTablesData", function (req, res, next) {
    analysisApi.getTablesData(req, res);
  });

  app.post("/parseSCV", function (req, res, next) {
    analysisApi.parseSCV(req, res);
  });
};
