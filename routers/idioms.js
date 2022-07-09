const express = require('express');
const idiomsRouter = express.Router();

const {
  ModelNames,
  create,
  findByPk,
  query,
} = require('../database/datasource');

//Endpoint to return a random idiom
idiomsRouter.get('/', async (req, res) => {
  const id = req.query.id;

  try {
    if (!id) {
      const {
        result,
      } = await query('SELECT TOP 1 * FROM Idioms ORDER BY NEWID()');

      if (result.length === 0) {
        res.status(400).send('There are no idioms in the database.');
        return;
      }

      res.send(result[0]);

    } else {
      const result = await findByPk(ModelNames.Idiom, id);

      if (!result) {
        res.status(404).send('An idiom with the specified id could not be found.');
        return;
      }

      res.send(result);

    }

  } catch (err) { //TODO: Logging/Tracing?
    console.error(err);
    res.status(500).send('An unexpected error has occurred.')
  }
});

/*
 * Endpoint to add new idioms to the database
 * TODO: Security.
 */
idiomsRouter.post('/', async (req, res) => {
  const {
    idiom,
    meaning,
    origin,
  } = req.body;

  if (!idiom || !meaning || !origin) {
    res.status(400).send('Invalid parameters.');
    return;
  }

  try {
    const record = await create(ModelNames.Idiom, {
      Idiom: idiom,
      Meaning: meaning,
      Origin: origin,
    });
    res.send(record);

  } catch (err) { //TODO: Logging/Tracing?
    res.status(500).send('An unexpected error has occurred.');
  }
});

idiomsRouter.post('/new/', async (req, res) => {
  const {
    idiom,
    meaning,
    origin,
  } = req.body;

  if (!idiom || !meaning || !origin) {
    res.status(400).send('Invalid parameters.');
    return;
  }

  console.log(req.body);

  // try {
  //   const record = await create(ModelNames.Idiom, {
  //     Idiom: idiom,
  //     Meaning: meaning,
  //     Origin: origin,
  //   });
  //   res.send(record);

  // } catch (err) { //TODO: Logging/Tracing?
  //   res.status(500).send('An unexpected error has occurred.');
  // }
});

module.exports = idiomsRouter;