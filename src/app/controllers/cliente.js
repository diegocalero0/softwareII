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
		callback();
	}

};