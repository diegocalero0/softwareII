module.exports = {
	
	listarProductos: function(callback){
		connection.query("SELECT * FROM PRODUCTO", function(err, data, field){
			callback(data, err);
		});
	},

	obtenerProducto: function(id, callback){
		var producto;
		connection.query("SELECT * FROM PRODUCTO WHERE ID_PRODUCTO = ?", [id], function(err, data, fields){
			if(err)
				callback(undefined, err);
			producto = {
				"id": id,
				"nombre": data[0].NOMBRE,
				"descripcion": data[0].DESCRIPCION,
				"precio": data[0].PRECIO_VENTA,
				"cantidad": data[0].CANTIDAD,
				"material": data[0].MATERIAL,
				"foto": data[0].FOTO
			}
			callback(producto, err);
		});
	},

	modificarProducto: function(producto, callback){
		if(producto.foto === undefined)
			connection.query("UPDATE PRODUCTO SET NOMBRE = ?, DESCRIPCION = ?, PRECIO_VENTA = ?, CANTIDAD = ?, MATERIAL = ? WHERE ID_PRODUCTO = ?"
				,[producto.nombre, producto.descripcion, producto.precio, producto.cantidad, producto.material, producto.id]
				,function(err, data, fields){
					callback(err);
				});
		else
			connection.query("UPDATE PRODUCTO SET NOMBRE = ?, DESCRIPCION = ?, PRECIO_VENTA = ?, CANTIDAD = ?, MATERIAL = ?, FOTO = ? WHERE ID_PRODUCTO = ?"
				,[producto.nombre, producto.descripcion, producto.precio, producto.cantidad, producto.material, producto.foto, producto.id]
				,function(err, data, fields){
					callback(err);
				});
	},

	agregarProducto: function(producto, callback){
		connection.query("INSERT INTO PRODUCTO (ID_PRODUCTO, NOMBRE, DESCRIPCION, PRECIO_VENTA, CANTIDAD, MATERIAL, FOTO, TIPO, ANCHO, ALTO, PROFUNDIDAD, COLOR, PESO) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)",
			[producto.id, producto.nombre, producto.descripcion, producto.precio, producto.cantidad, producto.material, producto.foto, producto.tipo, producto.ancho, producto.alto, producto.profundidad, producto.color, producto.peso]
		,function(err, data, field){
			callback(err);
		});
	},

	eliminarProducto: function(id, callback){
		connection.query("DELETE FROM PRODUCTO WHERE ID_PRODUCTO = ?", [id], function(err, data, field){
			callback(err);
		});
	},

	agregarAdministrador: function(user, pass, callback){
		connection.query("INSERT INTO ADMINISTRADOR VALUES(?,?)", [user, pass], function(err, data, field){
			callback(err);
		});
	},

	obtenerAdministradores: function(callback){
		connection.query("SELECT * FROM ADMINISTRADOR", function(err, data, field){
			if(err)
				console.log(err);
			callback(data);
		});	
	},

	eliminarAdministrador: function(id, callback){
		connection.query("DELETE FROM ADMINISTRADOR WHERE IDENTIFICACION = ?", [id], function(err, data, field){
			if(err)
				callback(1, err);
			callback(0, err);
		});
	},

	agregarCliente: function(cliente, callback){
		connection.query("INSERT INTO CLIENTE VALUES(?,?,?,?,?,?,?,?,?,?)"
			,[cliente.id, cliente.nombre, cliente.telefono, cliente.celular, cliente.direccion, cliente.profesion, cliente.correo, cliente.ciudad, cliente.tipo_doc, cliente.pass]
			,function(err, data, field){
				callback(err);
		});
	},

	obtenerCliente: function(id, callback){
		connection.query("SELECT * FROM CLIENTE WHERE EMAIL = ?", [id], function(err, data, field){
			if(err)
				console.log(err);
			callback(data[0], err);
		});
	},

	obtenerClientePorId: function(id, callback){
		connection.query("SELECT * FROM CLIENTE WHERE NUM_IDENTIFICACION = ?", [id], function(err, data, field){
			if(err)
				console.log(err);
			callback(data[0], err);
		});
	},

	listarClientes: function(callback){
		connection.query("SELECT * FROM CLIENTE", function(err, data, field){
			if(err)
				console.log(err);
			callback(data);
		});
	},

	listarClientesPorId: function(id, callback){
		connection.query("SELECT * FROM CLIENTE WHERE NUM_IDENTIFICACION = ?", [id], function(err, data, field){
			if(err)
				console.log(err);
			callback(data, err);
		});
	},

	listarClientesPorNombre: function(nombre, callback){
		connection.query("SELECT * FROM CLIENTE WHERE NOMBRE_COMPLETO LIKE \'%" + nombre + "%\'", function(err, data, field){
			if(err)
				console.log(err);
			callback(data, err);
		});
	},

	listarClientesPorEmail: function(email, callback){
		connection.query("SELECT * FROM CLIENTE WHERE EMAIL LIKE \'%" + email + "%\'", function(err, data, field){
			if(err)
				console.log(err);
			callback(data, err);
		});
	},

	obtenerCiudad: function(id, callback){
		connection.query("SELECT * FROM CIUDAD WHERE ID = ?", [id], function(err, data, fields){
			callback(data[0]);
		});
	},

	eliminarCliente: function(id, callback){
		connection.query("DELETE FROM CLIENTE WHERE NUM_IDENTIFICACION = ?", [id], function(err, data, fields){
			callback(1);
		});
	}

}