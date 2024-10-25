const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.HOST,
    dialect: "postgres",
    port: 5432,
    logging: console.log,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);


try {
  sequelize.authenticate();
  console.log("Conection has been successfully established");
} catch (error) {
  console.error("Unable to connect to the database", error);
}

module.exports = sequelize;
