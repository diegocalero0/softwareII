var express = require("express");
var router = express.Router();
var session_user = require("../middlewares/session_user");
var dbConnection = require("../../config/dbConnection");
var administrador = require("../controllers/administrador");
var tienda = require("../controllers/tienda");
var cliente = require("../controllers/cliente");

router.use(session_user);

router.get("/cerrarsesion", function(req, res){
	cliente.cerrarSesion(req, function(){
		res.redirect("/");
	});
});

module.exports = router;