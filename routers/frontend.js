const express = require("express");
const frontendRouter = express.Router();

frontendRouter.get("/", (_, res) => {
  res.sendFile(appRoot + "/public/index.html");
});

frontendRouter.get("/random", (_, res) => {
  res.sendFile(appRoot + "/public/pages/randomIdiom.html");
});

frontendRouter.get("/admin", (req, res) => {
  res.sendFile(appRoot + "/public/admin-management/admin-management.html");
});

frontendRouter.get("/admin/view", (req, res) => {
  res.sendFile(appRoot + "/public/admin-management/admin-view-all.html");
});

frontendRouter.get("/admin/update", (req, res) => {
  res.sendFile(appRoot + "/public/admin-management/admin-update.html");
});

frontendRouter.get("/admin/delete", (req, res) => {
  res.sendFile(appRoot + "/public/admin-management/admin-delete.html");
});

frontendRouter.get("/admin/error", (req, res) => {
  res.sendFile(appRoot + "/public/admin-management/admin-error.html");
});

frontendRouter.get("/js/*", (req, res) => {
  res.sendFile(appRoot + "/public/" + req.url);
});

frontendRouter.get("/styles/*", (req, res) => {
  res.sendFile(appRoot + "/public/" + req.url);
});

module.exports = frontendRouter;
