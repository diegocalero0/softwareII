var tienda = require("../controllers/tienda");

module.exports = function(req, res, next){
	if(req.session.type_user == 0){
		res.locals = {type_user:0};
		res.redirect("/admin");
	}else if(req.session.type_user == 1){
		tienda.obtenerCliente(req.session.userclient, function(data, err){
			if(err)
				console.log(err);
			res.locals = {type_user:1,user: data};
			next();
		});
		
	}else{
		res.locals = {type_user:-1};
		next();
	}
}