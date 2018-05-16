var tienda = require("../controllers/tienda");

module.exports = function(req, res, next){
	if(req.session.type_user == 1){
		tienda.obtenerCliente(req.session.userclient, function(data, err){
			res.locals = {type_user:1, user:data};
			next();
		});	
	}else{
		res.redirect("/shop");
	}
}