const express = require("express");
require("dotenv").config();
const sequelize = require('./db/sequelize');
const PORT = process.env.PORT;


const app = express();

//middleware
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello here!");
});



app.listen(PORT, () => console.log(`listening on port: ${PORT}`));
