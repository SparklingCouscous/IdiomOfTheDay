const express = require('express');
const idiomsRouter = express.Router();

const fs = require('fs');

//Endpoint to return a random idiom
idiomsRouter.get('/', (req, res) => {
  fs.readFile('../idioms.txt', 'utf-8', (err, data) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
      return;
    }

    const idiomArr = data.split('\n');
    const index = Math.round((idiomArr.length - 1) * Math.random());
    res.send(idiomArr[index]);
  });
});

module.exports = idiomsRouter;