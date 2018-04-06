var express = require("express");
var router = express.Router();
var session_admin = require("../middlewares/session_admin");
var fs = require("fs");
const dbConnection = require("../../config/dbConnection");
var connection = dbConnection();

router.use(session_admin);

router.get("/", function(req, res){
	console.log(req.session);
	res.render("admin/home", {usuario:req.session.useradmin});
});

router.get("/agregarProducto", function(req, res){
	res.render("admin/agregarProducto");
});

router.post("/validarProducto", function(req, res){
	var referencia = req.fields.referencia;
	var nombre = req.fields.nombre;
	var descripcion = req.fields.descripcion;
	var precio = req.fields.precio;
	var cantidad = req.fields.cantidad;
	var materiales = req.fields.materiales;
	var imagen = "default.png";
	connection.query("INSERT INTO PRODUCTO (ID_PRODUCTO, NOMBRE, DESCRIPCION, PRECIO_VENTA, CANTIDAD, MATERIAL, FOTO) VALUES(?,?,?,?,?,?,?)", [referencia, nombre, descripcion, precio, cantidad, materiales, imagen]
		,function(err, data, field){
			if(err){
				console.log(err);
			}else{
				if(req.files.imagen.name != ""){
					var extension = req.files.imagen.name.split(".").pop();
					var img = "src/app/public/images/productos/"+referencia+"."+extension;
					var imgdb = referencia+"."+extension;
					fs.rename(req.files.imagen.path, img);
					connection.query("UPDATE PRODUCTO SET FOTO = ? WHERE ID_PRODUCTO = ?", [imgdb, referencia], function(err, data, field){
						if(err){
							console.log(err);
						}
					});
				}
			}
		});
	res.redirect("/admin/productos");
});

router.get("/productos",function(req, res){
	connection.query("SELECT * FROM PRODUCTO", function(err, data, field){
		if(err){
			console.log(err);
		}else{
			console.log(data);
			res.render("admin/productos", {productos: data});
		}
	});
});

router.get("/cerrarsesion", function(req, res){
	req.session.type_user = undefined;
	res.redirect("/");
});

module.exports = router;