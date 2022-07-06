const express = require('express');
const frontendRouter = express.Router();

frontendRouter.get('/', (_, res) => {
  res.sendFile(appRoot + '/public/index.html');
})

module.exports = frontendRouter;