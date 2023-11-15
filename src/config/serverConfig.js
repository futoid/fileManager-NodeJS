const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require("bcrypt");

//Database Connection
async function connectToDB() {
  const sequelize = new Sequelize(process.env.DEV_DATABASE_URL);

  try {
    await sequelize.authenticate();
    console.log("Database connection has been established successfully");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

module.exports = {
  PORT: process.env.PORT,
  SALT: bcrypt.genSaltSync(10),
  JWT_KEY: process.env.JWT_KEY,
  dbconnect: connectToDB,
};
