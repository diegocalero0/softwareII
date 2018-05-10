var express = require("express");
var router = express.Router();
var session_admin = require("../middlewares/session_admin");
var fs = require("fs");
var dbConnection = require("../../config/dbConnection");
var connection = dbConnection();
var administrador = require("../controllers/administrador");
var tienda = require("../controllers/tienda");

router.use(session_admin);


router.get("/", function(req, res){
	tienda.obtenerAdministradores(function(data){
		res.render("admin/home", {usuario:req.session.useradmin, administradores: data});
	});
});

router.get("/agregarproducto", function(req, res){
	res.render("admin/agregarProducto");
});

router.get("/modificarproducto", function(req, res){
	tienda.obtenerProducto(req.url.split("?")[1].split("=")[1], function(producto, err){
		if(err)
			console.log(err);
		console.log(producto);
		res.render("admin/modificarProducto", {producto});
	});
});

router.post("/confirmarmodificacion", function(req,res){
	var referencia = req.fields.referencia;
	var nombre = req.fields.nombre;
	var descripcion = req.fields.descripcion;
	var precio = req.fields.precio;
	var cantidad = req.fields.cantidad;
	var materiales = req.fields.materiales;
	var imagen = "default.png";

	var producto = {
		"id": referencia,
		"nombre": nombre,
		"descripcion": descripcion,
		"precio": precio,
		"cantidad": cantidad,
		"material": materiales,
		"foto": imagen
	}

	if(req.files.imagen.name != ""){
		var extension = req.files.imagen.name.split(".").pop();
		var img = "src/app/public/images/productos/"+referencia+"."+extension;
		var imgdb = referencia+"."+extension;
		fs.rename(req.files.imagen.path, img);
		producto.foto = imgdb;
	}else{
		producto.foto = undefined;
	}

	tienda.modificarProducto(producto, function(err){
		if(err)
			console.log();
	});

	res.redirect("/admin/productos");

});

router.get("/eliminaradmin", function(req, res){
	var id = req.url.split("?")[1].split("=")[1];
	administrador.eliminarAdministrador(id, function(error, err){
		res.redirect("/");
	});
});

router.get("/eliminarproducto", function(req, res){
	var id = req.url.split("?")[1].split("=")[1];

	connection.query("DELETE FROM PRODUCTO WHERE ID_PRODUCTO = ?", [id], function(err, data, field){
		if(err)
			console.log();
	});

	res.redirect("/admin/productos");

});

router.post("/agregaradmin", function(req, res){

	var usuario = req.fields.usuario;
	var pass = req.fields.contrasena;


	connection.query("INSERT INTO ADMINISTRADOR VALUES(?,?)", [usuario, pass], function(err, data, field){
		if(err){
			console.log(err);
		}
	});

	res.redirect("/");

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