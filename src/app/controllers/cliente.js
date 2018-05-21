var tienda = require("./tienda");

module.exports = {

	iniciarSesion: function(req, id, password, callback){
		req.session.carrito = [];
		connection.query("SELECT * FROM CLIENTE WHERE EMAIL = ? AND CONTRASENIA = ?", [id, password]
			,function(err, data, fields){
				if(data.length != 0){
					req.session.type_user = 1;
					req.session.userclient = id;
				}
				callback(data.length);
		});
	},

	cerrarSesion: function(req, callback){
		req.session.type_user = undefined;
		req.session.carrito = undefined;
		callback();
	},

	agregarAlCarrito: function(req, id, cantidad, callback){
		var producto = tienda.obtenerProducto(id, function(producto, err){
			if(err)
				console.log(err);
			if(req.session.carrito == undefined)
				req.session.carrito = [];
			producto.CANTIDADAGREGADA = cantidad;
			req.session.carrito.push(producto);
			callback(err);
		});
	},

	eliminarDelCarrito: function(req, idx, callback){
		req.session.carrito.splice(idx, 1);
		callback();
	},

	modificarDatos: function(id, user, callback){
		connection.query("UPDATE CLIENTE SET EMAIL = ?, NOMBRE_COMPLETO = ?, CONTRASENIA = ?, TELEFONO_RESIDENCIA = ?, TELEFONO_CELULAR = ?, CIUDAD_ID = ?, DIRECCION = ?, PROFESION = ? WHERE EMAIL = ?"
			,[user.correo, user.nombre, user.password, user.telefono, user.celular, user.ciudad, user.direccion, user.profesion, id]
			, function(err, data, fields){
			callback(err);
		});
	}

};