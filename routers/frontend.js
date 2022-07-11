const express = require("express");
const frontendRouter = express.Router();
// var axios = require("axios");

frontendRouter.get("/", (_, res) => {
  res.sendFile(appRoot + "/public/index.html");
});

frontendRouter.get("/admin", (req, res) => {
  res.sendFile(appRoot + "/public/admin-management/admin-management.html");
  // // console.log(req);
  // const code = req.query.code;

  // const config = {
  //   method: "post",
  //   url:
  //     "https://idiom-a-day-sign-in.auth.us-east-1.amazoncognito.com/token?grant_type=authorization_code&code=" +
  //     code +
  //     "&redirect_uri=http://localhost:8080/admin&client_id=20e1ukc740tq9ced1ikk676119",
  //   headers: {
  //     "Content-Type": "application/x-www-form-urlencoded",
  //     Cookie: "XSRF-TOKEN=a8e59c9d-4dee-4b30-9f65-463794d88e22",
  //   },
  // };

  // axios(config)
  //   .then(function (response) {
  //     // console.log(JSON.stringify(response.data));
  //   })
  //   .catch(function (error) {
  //     // console.log(error);
  //   });
});

frontendRouter.get("/js/*", (req, res) => {
  res.sendFile(appRoot + "/public/" + req.url);
});

frontendRouter.get("/styles/*", (req, res) => {
  res.sendFile(appRoot + "/public/" + req.url);
});

module.exports = frontendRouter;

