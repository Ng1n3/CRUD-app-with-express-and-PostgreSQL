const express = require('express');
require('dotenv').config();
const sequelize = require('./db/sequelize');
const v1BookRouter = require('./v1/routes/router');


const createApp = () => {
  const app = express();

  //middleware
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use('/api/v1/books', v1BookRouter);

  return app;
};

const startServer = async (app, PORT=process.env.PORT) => {
  try {
    await sequelize.sync({ force: false });
    const server = app.listen(PORT, () => {
      console.log(`App is currently listening on port ${PORT}`);
    });
    return server;
  } catch (error) {
    console.error('Error syncing Sequelize models:', error);
    throw error;
  }
};

const app = createApp();

module.exports = {
  app,
  startServer,
  createApp,
};