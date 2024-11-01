const { Sequelize } = require('sequelize');
const dbConfig = require('../config/database');
require('dotenv').config({
  path: `${process.env.NODE_ENV.env || 'development'}`,
});

const env = process.env.NODE_ENV || 'development';
const config = dbConfig[env];

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    port: config.port,
    logging: config.logging,
    pool: config.pool,
  }
);

try {
  sequelize.authenticate();
  console.log(
    `Conection has been successfully established for ${env} environment`
  );
} catch (error) {
  console.error(
    `Unable to connect to the database in ${env} environment`,
    error
  );
}

module.exports = sequelize;
