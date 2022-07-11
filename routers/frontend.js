const express = require('express');
const frontendRouter = express.Router();

frontendRouter.get('/', (_, res) => {
  res.sendFile(appRoot + '/public/index.html');
})

frontendRouter.get('/admin', (_, res) => {
  res.sendFile(appRoot + '/public/admin-management/admin-management.html')
})

frontendRouter.get('/js/*', (req, res) => {
  res.sendFile(appRoot + '/public/' + req.url);
});

frontendRouter.get('/styles/*', (req, res) => {
  res.sendFile(appRoot + '/public/' + req.url);
});

module.exports = frontendRouter;