// ==+==+==+==+==+==+==+==+==+==[Requirements]==+==+==+==+==+==+==+==+==+==
const express = require("express");
const bodyParser = require("body-parser");
const route = require("./route/routes");
const connection=require("./database/db")
const app = express();
const multer = require('multer')
const dotnet= require("dotenv")

app.use(bodyParser.json());
app.use(multer().any());
app.use(bodyParser.urlencoded({extended : true}));
dotnet.config()

// ==+==+==+==+==+==+==+==+==+==[Connect DataBase]==+==+==+==+==+==+==+==+==+==

const PORT= process.env.PORT || 3000

const USERNAME=process.env.DB_USERNAME
const PASSWORD=process.env.DB_PASSWORD

app.use("/", route);

connection.Connection(USERNAME,PASSWORD)
app.listen(PORT,()=>console.log(`Server is running Successfully on PORT ${PORT} `))



