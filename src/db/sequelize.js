const { Sequelize } = require('sequelize');
require('dotenv').config()

const env = process.env.NODE_ENV || 'development';

// Debug logging for environment variables
console.log('Database Configuration:', {
  environment: env,
  database: process.env.DB_DATABASE,
  username: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  password: process.env.DB_PASSWORD // Don't log the actual password
});

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT || 5432,
    logging: env === 'development' ? console.log : false,
    pool: {
      max: env === 'production' ? 10 : 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    ...(env === 'production' && {
      dialectOptions: {
        ssl: {
          require: true,
          rejectUnauthorized: false,
        },
      },
    }),
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
    error.message,
    error
  );
}

module.exports = sequelize;
