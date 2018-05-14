module.exports = function(req, res, next){
	if(req.session.type_user == 1){
		res.locals = {type_user:1};
		next();
	}else{
		res.redirect("/shop");
	}
}