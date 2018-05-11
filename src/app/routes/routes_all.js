var express = require("express");
var router = express.Router();
var session_nouser = require("../middlewares/session_nouser");
var dbConnection = require("../../config/dbConnection");
var administrador = require("../controllers/administrador");
var tienda = require("../controllers/tienda");
var cliente = require("../controllers/cliente");

connection = dbConnection();

router.use(session_nouser);

router.post("/loginadmin", function(req, res){
	var iden = req.fields.iden;
	var pass = req.fields.pass;
	administrador.iniciarSesion(req, iden, pass, function(result){
		if(result == 0){
			console.log("el admin no existe")
			res.redirect("/")
		}else{
			res.redirect("/admin")
		}
	});
});

router.get("/ingresoadministrador", function(req, res){
	res.render("loginAdmin");
});

router.get("/masvendidos", function(req, res){
	res.render("masvendidos");
});

router.get("/", function(req, res){
	tienda.listarProductos(function(data,err){
		if(err){
			console.log(err);
		}else{
			res.render("productos", {productos: data});
		}
	});
});

router.get("/login", function(req, res){
	res.render("login");
});

router.post("/confirmlogin", function(req, res){
	var id = req.fields.user;
	var pass = req.fields.password;

	cliente.iniciarSesion(req, id, pass, function(datos){
		if(datos == 0)
			console.log("No puede iniciar sesion, verificar datos");
		res.redirect("/");
	});

});

router.post("/registro", function(req, res){
	var correo = req.fields.user;
	var pass = req.fields.password;
	res.render("registro", {correo:correo, pass:pass});
});

router.post("/validarRegistro", function(req, res){
	var id = req.fields.identificacion;
	var nombre = req.fields.nombre + " " + req.fields.apellido;
	var telefono = req.fields.telefono;
	var celular = req.fields.celular;
	var direccion = req.fields.direccion;
	var profesion = req.fields.profesion;
	var correo = req.fields.correo;
	var ciudad = req.fields.ciudad;
	var tipo_doc = req.fields.tipodocumento;
	var pass = req.fields.password;


	if(tipo_doc == "Cédula"){
		tipo_doc = 0;
	}else{
		tipo_doc = 1;
	}

	var cliente = {
		"id": id,
		"nombre": nombre,
		"telefono": telefono,
		"celular": celular,
		"direccion": direccion,
		"profesion": profesion,
		"correo": correo,
		"ciudad": ciudad,
		"tipo_doc": tipo_doc,
		"pass": pass
	}

	tienda.agregarCliente(cliente, function(err){
		if(err)
			console.log(err);
		res.redirect("/");
	});
});

module.exports = router;