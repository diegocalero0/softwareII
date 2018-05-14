module.exports = {

	iniciarSesion: function(req, iden, pass, callback){
		connection.query("SELECT * FROM ADMINISTRADOR WHERE IDENTIFICACION = ? AND CONTRASENIA = ?",
			[iden, pass], function(err, data, field){
			if(data.length != 0){
				req.session.type_user = 0;
				req.session.useradmin = iden;
			}
			callback(data.length);
		});
	},

	cerrarSesion: function(req, callback){
		req.session.type_user = undefined;
		callback();
	}

};