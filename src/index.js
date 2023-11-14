const express = require("express");
const { PORT } = require("./config/serverConfig");
const bodyParser = require("body-parser");

async function serverSetup() {
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
  });
}

serverSetup();
