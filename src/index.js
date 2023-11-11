const express = require("express");
require("dotenv").config();
const sequelize = require("./db/sequelize");
const v1BookRouter = require("./v1/routes/router");
const PORT = process.env.PORT;

const app = express();

//middleware
app.use(express.json());
app.use("/api/v1/books", v1BookRouter);

sequelize
  .sync({ force: false })
  .then(() => {
    app.listen(PORT, () => console.log(`listening on port: ${PORT}`));
  })
  .catch((error) => {
    console.error("Error syncing Sequelize models:", error);
  });
  