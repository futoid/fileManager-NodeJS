const express = require("express");
const { PORT, dbconnect } = require("./config/serverConfig");
const bodyParser = require("body-parser");
const apiRoutes = require("./apis/index");

async function serverSetup() {
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use("/api", apiRoutes);
  app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`);
  });
  dbconnect();
}

serverSetup();
