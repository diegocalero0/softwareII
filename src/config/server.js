const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
var session = require("express-session");
var app = express();
var formidable = require("express-formidable");
var router_admin = require("../app/routes/routes_admin");
var router_all = require("../app/routes/routes_all");
var router_nouser = require("../app/routes/routes_nouser");
var router_user = require("../app/routes/routes_user");
require('events').EventEmitter.prototype._maxListeners = 100;

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
app.use(formidable({keepExtensions: true}));


app.use("/admin", router_admin);
app.use("/shop", router_all);
app.use("/user", router_user);
app.use("/nouser", router_nouser);


//app.use(bodyParser.urlencoded({extended: true}));

module.exports = app;