var tienda = require("./tienda");

module.exports = {

	iniciarSesion: function(req, id, password, callback){
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

	agregarAlCarrito: function(req, id, callback){
		var producto = tienda.obtenerProducto(id, function(producto, err){
			if(err)
				console.log(err);
			if(req.session.carrito == undefined)
				req.session.carrito = [];
			req.session.carrito.push(producto);
			callback(err);
		});
	},

	eliminarDelCarrito: function(req, idx, callback){
		req.session.carrito.splice(idx, 1);
		callback();
	}

};