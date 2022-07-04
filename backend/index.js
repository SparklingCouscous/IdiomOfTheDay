const express = require('express')
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('Hello World!');
})

const port = 8080;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})