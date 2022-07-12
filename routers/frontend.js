const express = require("express");
const frontendRouter = express.Router();
// var axios = require("axios");

frontendRouter.get("/", (_, res) => {
  res.sendFile(appRoot + "/public/index.html");
});


frontendRouter.get("/random", (_, res) => {
  res.sendFile(appRoot + "/public/pages/randomIdiom.html");
});



frontendRouter.get("/admin", (req, res) => {
  res.sendFile(appRoot + "/public/admin-management/admin-management.html");
});

frontendRouter.get("/js/*", (req, res) => {
  res.sendFile(appRoot + "/public/" + req.url);
});

frontendRouter.get("/styles/*", (req, res) => {
  res.sendFile(appRoot + "/public/" + req.url);
});

module.exports = frontendRouter;

