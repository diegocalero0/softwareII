const dbConnection = require("../../config/dbConnection")
var router_admin = require("../../config/routes_admin");
var session_middleware = require("../middlewares/session_admin");
var session_nouser = require("../middlewares/session_nouser");


module.exports = function (app){


	const connection = dbConnection();

	app.use("/admin", session_middleware);
	app.use("/admin", router_admin);
	app.use("/", session_nouser);

	app.post("/loginadmin", function(req, res){
		var iden = req.body.iden;
		var pass = req.body.pass;

		connection.query("SELECT * FROM ADMINISTRADOR WHERE IDENTIFICACION = ? AND CONTRASENIA = ?", [iden, pass], function(err, data, field){
			if(data.length != 0){
				req.session.type_user = 0;
				res.redirect("/admin");
			}else{
				res.redirect("/");
			}
		});
	});

	app.get("/masvendidos", function(req, res){
		res.render("masvendidos");
	});

	app.get("/", function(req, res){
		console.log(req.session.type_user);
		res.render("index");
	});

	app.get("/login", function(req, res){
		res.render("login");
	});

	app.post("/confirmlogin", function(req, res){
		res.render("login");
	});

	app.post("/registro", function(req, res){
		var correo = req.body.user;
		var pass = req.body.password;
		console.log(correo);
		console.log(pass);
		res.render("registro", {correo:correo, pass:pass});
	});

	app.post("/validarRegistro", function(req, res){
		var id = req.body.identificacion;
		var nombre = req.body.nombre + " " + req.body.apellido;
		var telefono = req.body.telefono;
		var celular = req.body.celular;
		var direccion = req.body.direccion;
		var profesion = req.body.profesion;
		var correo = req.body.correo;
		var ciudad = req.body.ciudad;
		var tipo_doc = req.body.tipodocumento;
		var pass = req.body.password;


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

}

