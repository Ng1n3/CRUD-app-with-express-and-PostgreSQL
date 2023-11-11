const express = require("express");
require("dotenv").config();
const sequelize = require('./db/sequelize');
const v1BookRouter = require('./v1/routes/router')
const PORT = process.env.PORT;


const app = express();


//middleware
app.use(express.json());
app.use('/api/v1/books', v1BookRouter);
app.get("/", (req, res) => {
  res.send("Hello here!");
});



app.listen(PORT, () => console.log(`listening on port: ${PORT}`));
