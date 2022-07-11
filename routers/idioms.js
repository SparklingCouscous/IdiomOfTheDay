const express = require("express");
const idiomsRouter = express.Router();

const {
  ModelNames,
  create,
  findByPk,
  query,
  destroy,
  findAll,
  update,
} = require("../database/datasource");
const { Models } = require("../database/models");

//Endpoint to return a random idiom
idiomsRouter.get("/", async (req, res) => {
  

  try {
    const { result } = await query(
      "SELECT TOP 1 * FROM Idioms ORDER BY NEWID()"
    );

    if (result.length === 0) {
      res.status(400).send("There are no idioms in the database.");
      return;
    }

    res.send(result[0]);
  } catch (err) {
    //TODO: Logging/Tracing?
    console.error(err);
    res.status(500).send("An unexpected error has occurred.");
    res.redirect("/admin/error");
  }
});

//Endpoint to get all idioms
idiomsRouter.get("/all", async (req, res) => {
  
  try {
    const result = await findAll(ModelNames.Idiom);

    res.send(result);
  } catch (err) {
    //TODO: Logging/Tracing?
    console.error(err);
    res.status(500).send("An unexpected error has occurred.");
    res.redirect("/admin/error");
  }
});

//Endpoint to get a specific idiom
idiomsRouter.get("/one/:id", async (req, res) => {
  const id = req.params.id;
  
  console.log(id);
  try{
    const result = await findByPk(ModelNames.Idiom, id);

      if (!result) {
        res
          .status(404)
          .send("An idiom with the specified id could not be found.");
        return;
      }

      res.send(result);
  } catch (err) {
    //TODO: Logging/Tracing?
    console.error(err);
    res.status(500).send("An unexpected error has occurred.");
    res.redirect("/admin/error");
  }
})

//Endpoint to update an idiom
idiomsRouter.post("/update/", async(req, res) => {
  const { id, idiom, meaning, origin } = req.body;

  console.log(req.body);

  if (!id || !idiom || !meaning || !origin) {
    res.status(400).send("Invalid parameters.");
    return;
  }

  try {
    const result = await findByPk(ModelNames.Idiom, id);

    if(!result)
    {
      res
        .status(404)
        .send("An idiom with the specified id could not be found.");
        console.log(id);
      return;
    }
    else {
      const temp = await updateByPK(ModelNames.Idiom, {
        id: id,
        Idiom: idiom,
        Meaning: meaning,
        Origin: origin,
      }, id)

      console.log(`updated entry at ${id}`);
      res.redirect('/admin');
    } 
  } catch (err) {
    //TODO: Logging/Tracing?
    res.status(500).send("An unexpected error has occurred.");
    res.redirect("/admin/error");
  }
})

//Endpoint to delete from the database by id
idiomsRouter.post("/delete", async(req, res) => {
  const id = req.body.id;

  try {
    const result = await findByPk(ModelNames.Idiom, id);

    if(!result)
    {
      res
        .status(404)
        .send("An idiom with the specified id could not be found.");
        console.log(id);
      return;
    }
    else {
      const temp = await destroyByPK(ModelNames.Idiom, id);
      console.log("deleted entry");
      res.redirect('/admin/view');
    }

  } catch(err) {
    console.log(err);
    res.status(500).send("An unexpected error has occured.");
    res.redirect("/admin/error");
  }
})

/*
 * Endpoint to add new idioms to the database
 * TODO: Security.
 */
idiomsRouter.post("/", async (req, res) => {
  const { idiom, meaning, origin } = req.body;

  if (!idiom || !meaning || !origin) {
    res.status(400).send("Invalid parameters.");
    return;
  }

  try {
    const record = await create(ModelNames.Idiom, {
      Idiom: idiom,
      Meaning: meaning,
      Origin: origin,
    });
    res.send(record);
    res.redirect('/admin');
  } catch (err) {
    //TODO: Logging/Tracing?
    res.status(500).send("An unexpected error has occurred.");
    res.redirect("/admin/error");
  }
});

module.exports = idiomsRouter;
