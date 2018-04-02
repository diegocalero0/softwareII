module.exports = function(req, res, next){
	if(req.session.type_user != 0){
		res.redirect("/");
	}else{
		next();
	}
}