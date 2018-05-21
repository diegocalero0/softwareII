module.exports = {

	agregarVenta: function(referencia, carrito, usuario, callback){
		connection.query("INSERT INTO VENTA (ID_VENTA, FECHA, CLIENTE) VALUES(?, ?, ?)"
			, [referencia, new Date(), usuario.NUM_IDENTIFICACION]
			, function(err, data, fields){
				callback(err);
			});
	},
	
	listarProductos: function(callback){
		connection.query("SELECT * FROM PRODUCTO", function(err, data, field){
			callback(data, err);
		});
	},

	listarProductosPorReferencia: function(referencia, callback){
		connection.query("SELECT * FROM PRODUCTO WHERE ID_PRODUCTO = ?", [referencia], function(err, data, fields){
			callback(data, err);
		});
	},

	listarProductosPorNombre: function(nombre, callback){
		connection.query("SELECT * FROM PRODUCTO WHERE NOMBRE LIKE \'%" + nombre + "%\'", function(err, data, fields){
			callback(data, err);
		});
	},

	listarProductosPorTipo: function(tipo, callback){
		connection.query("SELECT * FROM PRODUCTO WHERE TIPO LIKE \'%" + tipo + "%\'", function(err, data, fields){
			callback(data, err);
		});
	},

	obtenerProducto: function(id, callback){
		var producto;
		connection.query("SELECT * FROM PRODUCTO WHERE ID_PRODUCTO = ?", [id], function(err, data, fields){
			if(err)
				callback(undefined, err);
			callback(data[0], err);
		});
	},

	modificarProducto: function(producto, callback){
		if(producto.foto === undefined)
			connection.query("UPDATE PRODUCTO SET NOMBRE = ?, DESCRIPCION = ?, TIPO = ?, MATERIAL = ?, ALTO = ?, ANCHO = ?, PROFUNDIDAD = ?, COLOR = ?, PESO = ? WHERE ID_PRODUCTO = ?"
				,[producto.nombre, producto.descripcion, producto.tipo, producto.material, producto.alto, producto.ancho, producto.profundidad, producto.color, producto.peso, producto.id]
				,function(err, data, fields){
					callback(err);
				});
		else
			connection.query("UPDATE PRODUCTO SET NOMBRE = ?, DESCRIPCION = ?, TIPO = ?, MATERIAL = ?, ALTO = ?, ANCHO = ?, PROFUNDIDAD = ?, COLOR = ?, PESO = ?, FOTO = ? WHERE ID_PRODUCTO = ?"
				,[producto.nombre, producto.descripcion, producto.tipo, producto.material, producto.alto, producto.ancho, producto.profundidad, producto.color, producto.peso, producto.foto, producto.id]
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
	},

	modificarPrecios: function(fields,callback){
		
		console.log(Object.keys(fields).length / 3);

		for(var i = 0; i < Object.keys(fields).length / 3; i++){
			connection.query("UPDATE PRODUCTO SET CANTIDAD = ?, PRECIO_VENTA = ? WHERE ID_PRODUCTO = ?"
				, [fields["cantidad" + i], fields["precio" + i], fields["id" + i]]
				, function(err, data, fields){
					if(err)
						console.log(err);
				});
		}
		callback(null);
	},
}