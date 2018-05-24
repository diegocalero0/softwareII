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

router.post("/agregaralcarrito", function(req, res){
	var id = req.fields.id;
	var cantidad = req.fields.cantidad;
	cliente.agregarAlCarrito(req, id, cantidad, function(err){
		res.redirect("/user/carrito");
	});
});

router.get("/carrito", function(req, res){
	var subtotal = 0;
	var carrito = req.session.carrito;

	for(var i = 0; i < carrito.length; i++){
		subtotal += carrito[i].PRECIO_VENTA * carrito[i].CANTIDADAGREGADA;
	}

	res.render("user/carrito", {carrito: carrito, subtotal: subtotal});
});

router.get("/pagar", function(req, res){

	var subtotal = 0;
	var carrito = req.session.carrito;
	var descripcion = "";

	for(var i = 0; i < carrito.length; i++){
		subtotal += carrito[i].PRECIO_VENTA * carrito[i].CANTIDADAGREGADA;
		descripcion += carrito[i].CANTIDADAGREGADA + " " + carrito[i].NOMBRE;
		if(i != carrito.length - 1)
			descripcion += ", ";
	}

	var valor = subtotal + 20000;
	var fecha = new Date();
	var referencia = Math.floor((fecha.getFullYear() + "" + (fecha.getMonth() + 1) + "" + fecha.getDate()) * Math.random());
	


	res.render("user/pago", {referencia:referencia, valor: valor, descripcion: descripcion});
});
	
router.post("/completarpago", function(req, res){
	var referencia = req.fields.referencia;

	tienda.agregarVenta(referencia, req.session.carrito, res.locals.user, function(err){
		if(err)
			console.log(err);
		req.session.carrito = [];
		res.redirect("/shop");
	});

});

router.get("/efectuarcompra", function(req, res){
	var subtotal = 0;
	var carrito = req.session.carrito;

	for(var i = 0; i < carrito.length; i++){
		subtotal += carrito[i].PRECIO_VENTA * carrito[i].CANTIDADAGREGADA;
	}
	res.render("user/resumendecompra", {carrito: carrito, subtotal: subtotal});
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

router.post("/guardarcambios", function(req, res){
	cliente.modificarDatos(req.session.userclient, req.fields, function(err){
		if(err)
			console.log(err);
		res.redirect("/user/perfil");
	});
});

module.exports = router;