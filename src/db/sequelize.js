const { Sequelize } = require("sequelize");
const pg = require("pg");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.HOST,
    dialect: "postgres",
  }
);


try {
  sequelize.authenticate();
  console.log("Conection has been successfully established");
} catch (error) {
  console.error("Unable to connect to the database", error);
}

module.exports = sequelize;
