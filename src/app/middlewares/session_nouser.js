module.exports = function(req, res, next){
	if(req.session.type_user == 0){
		res.locals = {type_user:0};
		res.redirect("/admin");
	}else if(req.session.type_user == 1){
		res.locals = {type_user:1};
		res.redirect("/shop");
	}else{
		res.locals = {type_user:-1};
		next();
	}
}