module.exports = {

	eliminarAdministrador: function(id, callback){
		connection.query("DELETE FROM ADMINISTRADOR WHERE IDENTIFICACION = ?", [id], function(err, data, field){
			if(err)
				callback(1, err);
			callback(0, err);
		});
	}

};