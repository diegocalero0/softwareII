const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

app = express();

app.set("port", process.env.PORT || 8080);
app.set("view engine", "jade");
app.set("views", path.join(__dirname, "../app/views"));
app.use(bodyParser.urlencoded({extended: false}));


module.exports = app;