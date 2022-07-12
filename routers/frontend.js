const express = require("express");
const frontendRouter = express.Router();
// var axios = require("axios");




// set up rate limiter: maximum of five requests per minute
const rateLimit = require('express-rate-limit');
const app = express();

const limiter = rateLimit({
  windowMs: 1*60*1000, // 1 minute
  max: 60
});

// apply rate limiter to all requests
app.use(limiter);

frontendRouter.use(limiter);


frontendRouter.get("/", (_, res) => {
  res.sendFile(appRoot + "/public/index.html");
});


frontendRouter.get("/config" , (_,res) =>{
  res.sendFile(appRoot + "/public/config.json")
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

