const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
var session = require("express-session");
var app = express();

app.use(session({
	secret: "98765abcde12345",
	resave: false,
	saveUninitialized: false
}));

app.set("port", process.env.PORT || 8080);
app.set("view engine", "jade");
app.set("views", path.join(__dirname, "../app/views"));
app.use(express.static(path.join(__dirname, "../app/public")));
app.use('/static', express.static(path.join(__dirname, "../app/public")));
app.use(bodyParser.urlencoded({extended: false}));



module.exports = app;