var express = require("express");
var router = express.Router();
var session_nouser = require("../middlewares/session_nouser");
const dbConnection = require("../../config/dbConnection");

connection = dbConnection();

router.use(session_nouser);
router.post("/loginadmin", function(req, res){

	var iden = req.fields.iden;
	var pass = req.fields.pass;
	connection.query("SELECT * FROM ADMINISTRADOR WHERE IDENTIFICACION = ? AND CONTRASENIA = ?", [iden, pass], function(err, data, field){
		if(data.length != 0){
			req.session.type_user = 0;
			req.session.useradmin = iden;
			res.redirect("/admin");
		}else{
			res.redirect("/");
		}
	});
});

router.get("/masvendidos", function(req, res){
	res.render("masvendidos");
});

router.get("/", function(req, res){
	connection.query("SELECT * FROM PRODUCTO", function(err, data, field){
		if(err){
			console.log(err);
		}else{
			console.log(data);
			res.render("productos", {productos: data});
		}
	});
});

router.get("/login", function(req, res){
	res.render("login");
});

router.post("/confirmlogin", function(req, res){
	res.render("login");
});

router.post("/registro", function(req, res){
	var correo = req.fields.user;
	var pass = req.fields.password;
	console.log(correo);
	console.log(pass);
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

	connection.query("INSERT INTO CLIENTE VALUES(?,?,?,?,?,?,?,?,?,?)", [id, nombre, telefono, celular, direccion, profesion, correo, ciudad, tipo_doc, pass], function(err, data, field){
		if(err){
			console.log(err);
			res.redirect("/");
			return;
		}else{
			res.redirect("/");
		}
	});
});

module.exports = router;