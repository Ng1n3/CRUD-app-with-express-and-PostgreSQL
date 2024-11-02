const { Sequelize } = require('sequelize');

const env = process.env.NODE_ENV || 'development';

const sequelize = new Sequelize(
  process.env.database,
  process.env.username,
  process.env.password,
  {
    host: process.env.host,
    dialect: 'postgres',
    port: process.env.PORT || 5432,
    logging:env === 'development' ? console.log : false,
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
        }
      }
    })
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
