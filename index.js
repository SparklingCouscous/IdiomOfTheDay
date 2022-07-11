global.appRoot = __dirname;

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const database = require("./database/datasource");
const idiomsRouter = require("./routers/idioms");
const frontendRouter = require("./routers/frontend");
const bodyParser = require("body-parser");

dotenv.config();

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", frontendRouter);
app.use("/api/idiom", idiomsRouter);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

database
  .initialize()
  .then(() => {
    database
      .sync()
      .then(() => {
        console.log("Database connected and synced");

        app.listen(process.env.APP_PORT, () => {
          console.log(`Server listening on port ${process.env.APP_PORT}`);
        });
      })
      .catch((error) => {
        throw error;
      });
  })
  .catch((error) => {
    throw error;
  });
