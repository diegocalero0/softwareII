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

router.get("/informes", function(req, res){
	res.render("admin/informes");
});

router.get("/informes/informe1", function(req, res){
	res.render("admin/informe1", {productos: {}, total: 0});
});

router.post("/informes/informe1", function(req, res){
	var date = req.fields.dia;
	tienda.ventasPorDia(date, function(err, resultados){
		if(err)
			console.log(err);
		var valor = 0;
		for(var i = 0; i < resultados.length; i++)
			valor += resultados[i].COSTO_UNITARIO * resultados[i].CANTIDAD;
		res.render("admin/informe1", {productos: resultados, total: valor});
	});
	
});


router.get("/informes/informe2", function(req, res){
	res.render("admin/informes");
});

router.get("/informes/informe3", function(req, res){
	res.render("admin/informes");
});


router.get("/agregarproducto", function(req, res){
	res.render("admin/agregarProducto");
});

router.get("/modificarproducto", function(req, res){
	tienda.obtenerProducto(req.url.split("?")[1].split("=")[1], function(producto, err){
		if(err)
			console.log(err);
		res.render("admin/modificarProducto", {producto: producto});
	});
});

router.get("/preciosproductos", function(req, res){
	tienda.listarProductos(function(data, err){
		res.render("admin/preciosproductos", {productos: data});
	});
});

router.post("/modificarprecios", function(req, res){
	console.log(req.fields);

	tienda.modificarPrecios(req.fields, function(err){
		if(err)
			console.log(err);
		res.redirect("/admin/preciosproductos");
	});
});

router.post("/confirmarmodificacion", function(req,res){
	var referencia = req.fields.referencia;
	var nombre = req.fields.nombre;
	var descripcion = req.fields.descripcion;
	var tipo = req.fields.tipo;
	var materiales = req.fields.materiales;
	var alto = req.fields.alto;
	var ancho = req.fields.ancho;
	var profundidad = req.fields.profundidad;
	var color = req.fields.color;
	var peso = req.fields.peso;
	var imagen = "default.png";

	var producto = {
		"id": referencia,
		"nombre": nombre,
		"descripcion": descripcion,
		"tipo": tipo,
		"material": materiales,
		"alto": alto,
		"ancho": ancho,
		"profundidad": profundidad,
		"color": color,
		"peso":peso,
		"foto": imagen
	}

	if(req.files.imagen.name != ""){
		var extension = req.files.imagen.name.split(".").pop();
		var img = "src/app/public/images/productos/"+referencia+"."+extension;
		var imgdb = referencia+"."+extension;
		fs.rename(req.files.imagen.path, img);
		producto.foto = imgdb;
	}

	tienda.modificarProducto(producto, function(err){
		if(err)
			console.log();
	});

	res.redirect("/admin/productos");

});

router.get("/eliminaradmin", function(req, res){
	var id = req.url.split("?")[1].split("=")[1];
	tienda.eliminarAdministrador(id, function(error, err){
		res.redirect("/");
	});
});

router.get("/eliminarproducto", function(req, res){
	var id = req.url.split("?")[1].split("=")[1];
	tienda.eliminarProducto(id, function(err){
		if(err)
			console.log(err);
		res.redirect("/admin/productos");
	});
});

router.post("/agregaradmin", function(req, res){

	var usuario = req.fields.usuario;
	var pass = req.fields.contrasena;


	tienda.agregarAdministrador(usuario, pass, function(err){
		if(err)
			console.log(err);
		res.redirect("/");
	});
});

router.post("/validarProducto", function(req, res){
	var referencia = req.fields.referencia;
	var nombre = req.fields.nombre;
	var descripcion = req.fields.descripcion;
	var tipo = req.fields.tipo;
	var materiales = req.fields.materiales;
	var alto = req.fields.alto;
	var ancho = req.fields.ancho;
	var profundidad = req.fields.profundidad;
	var color = req.fields.color;
	var peso = req.fields.peso;
	var precio = req.fields.precio;
	var cantidad = req.fields.cantidad;
	var imagen = "default.png";

	var producto = {
		"id": referencia,
		"nombre": nombre,
		"descripcion": descripcion,
		"tipo": tipo,
		"material": materiales,
		"alto": alto,
		"ancho": ancho,
		"profundidad": profundidad,
		"color": color,
		"peso":peso,
		"precio": 0,
		"cantidad": 0,
		"foto": imagen
	}

	if(req.files.imagen.name != ""){
		var extension = req.files.imagen.name.split(".").pop();
		var img = "src/app/public/images/productos/"+referencia+"."+extension;
		var imgdb = referencia+"."+extension;
		fs.rename(req.files.imagen.path, img);
		producto.foto = imgdb;
	}

	tienda.agregarProducto(producto, function(err){
		if(err)
			console.log(err);
		res.redirect("/admin/productos");
	});

});

router.get("/productos",function(req, res){
	tienda.listarProductos(function(data, err){
		if(err)
			console.log(err);
		else
			res.render("admin/productos", {productos: data});
	});
});

router.get("/cerrarsesion", function(req, res){
	administrador.cerrarSesion(req, function(){
		res.redirect("/");
	});
});

router.get("/clientes", function(req, res){
	tienda.listarClientes(function(data, err){
		res.render("admin/clientes", {clientes:data});
	});
});

router.post("/clientes", function(req, res){
	var id = req.fields.documento;
	var nombre = req.fields.nombre;
	var email = req.fields.correo;

	if(id != ""){
		tienda.listarClientesPorId(id, function(data, err){
			res.render("admin/clientes", {clientes:data});
		});
	}else if(nombre != ""){
		tienda.listarClientesPorNombre(nombre, function(data, err){
			res.render("admin/clientes", {clientes:data});
		});
	}else if(email != ""){
		tienda.listarClientesPorEmail(email, function(data, err){
			res.render("admin/clientes", {clientes:data});
		});
	}else{
		tienda.listarClientes(function(data, err){
			res.render("admin/clientes", {clientes:data});
		});
	}
});

router.get("/clientes/cliente", function(req, res){
	var id = req.url.split("?")[1].split("=")[1];
	tienda.obtenerClientePorId(id, function(cliente, err){
		if(cliente.TIPO_DOCUMENTO == 0)
			cliente.TIPO_DOCUMENTO = "Cédula";
		else
			cliente.TIPO_DOCUMENTO = "NIT";

		tienda.obtenerCiudad(cliente.CIUDAD_ID, function(ciudad){
			cliente.CIUDAD_ID = ciudad.NOMBRE;
			console.log(ciudad);
			res.render("admin/detallecliente", {cliente: cliente});
		});
		
	});
});

router.get("/eliminarcliente", function(req, res){
	var id = req.url.split("?")[1].split("=")[1];
	tienda.eliminarCliente(id, function(eliminado){
		res.redirect("/admin/clientes");
	});
});

router.get("/buscarproductos", function(req, res){
	tienda.listarProductos(function(data, err){
		res.render("admin/buscarproductos", {productos: data});
	});
});

router.post("/buscarproductos", function(req, res){
	var referencia = req.fields.referencia;
	var nombre = req.fields.nombre;
	var tipo = req.fields.tipo;

	if(referencia != ""){
		tienda.listarProductosPorReferencia(referencia, function(data, err){
			res.render("admin/buscarproductos", {productos: data});
		});
	}else if(nombre != ""){
		tienda.listarProductosPorNombre(nombre, function(data, err){
			res.render("admin/buscarproductos", {productos: data});
		});
	}else if(tipo != ""){
		tienda.listarProductosPorTipo(tipo, function(data, err){
			res.render("admin/buscarproductos", {productos: data});
		});
	}else{
		tienda.listarProductos(function(data, err){
			res.render("admin/buscarproductos", {productos: data});
		});
	}

	
	
});

module.exports = router;