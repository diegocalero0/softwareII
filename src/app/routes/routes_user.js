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

router.get("/agregaralcarrito", function(req, res){
	var idProducto = req.url.split("?")[1].split("=")[1];
	cliente.agregarAlCarrito(req, idProducto, function(err){
		res.redirect("/");
	});
});

router.get("/carrito", function(req, res){
	res.render("user/carrito", {carrito: req.session.carrito});
});
	
router.get("/eliminardelcarrito", function(req, res){
	var idx = req.url.split("?")[1].split("=")[1];
	cliente.eliminarDelCarrito(req, idx, function(){
		res.redirect("/user/carrito")
	});

});

router.get("/perfil", function(req, res){
	res.render("user/perfil");
});

module.exports = router;