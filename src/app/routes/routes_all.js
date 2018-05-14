var express = require("express");
var router = express.Router();
var session_all = require("../middlewares/session_all");
var dbConnection = require("../../config/dbConnection");
var administrador = require("../controllers/administrador");
var tienda = require("../controllers/tienda");
var cliente = require("../controllers/cliente");

connection = dbConnection();

router.use(session_all);

router.get("/", function(req, res){
	tienda.listarProductos(function(data,err){
		if(err){
			console.log(err);
		}else{
			res.render("all/productos", {productos: data});
		}
	});
});

router.get("/detalleproducto", function(req, res){
	var id = req.url.split("?")[1].split("=")[1];
	tienda.obtenerProducto(id, function(producto, err){
		if(err){
			console.log(err);
		}else{
			console.log(res.locals);
			res.render("all/detalleproducto", {producto: producto});
		}
	});
});

module.exports = router;