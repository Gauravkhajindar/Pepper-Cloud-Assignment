// ==+==+==+==+==+==+==+==+==+==[Requirements]==+==+==+==+==+==+==+==+==+==
const express = require("express");
const bodyParser = require("body-parser");
const route = require("./route/routes");
const mongoose = require("mongoose");
const app = express();
const multer = require('multer')
// const dotnet= require("dotenv")

app.use(bodyParser.json());
app.use(multer().any());
app.use(bodyParser.urlencoded({extended : true}));
// dotnet.config()

// ==+==+==+==+==+==+==+==+==+==[Connect DataBase]==+==+==+==+==+==+==+==+==+==
mongoose.set('strictQuery', true);
// const USERNAME=process.env.DB_USERNAME
// const PASSWORD=process.env.DB_PASSWORD

// Connection(USERNAME,PASSWORD)
mongoose
  .connect(
    "mongodb+srv://Gauravkhajindar:WWKCSP1WrPINTgvo@cluster0.2q2wy.mongodb.net/PepperCloudAssignmentDB",
    {
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err.message));

app.use("/", route);

app.listen(process.env.PORT || 3000, function () {
  console.log("Port running on " + (process.env.PORT || 3000));
});

