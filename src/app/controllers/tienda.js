module.exports = {
	obtenerAdministradores: function(callback){
		connection.query("SELECT * FROM ADMINISTRADOR", function(err, data, field){
			if(err)
				console.log(err);
			callback(data);
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
	}

}