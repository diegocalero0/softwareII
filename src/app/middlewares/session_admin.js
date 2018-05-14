module.exports = function(req, res, next){
	if(req.session.type_user != 0){
		return res.redirect("/");
	}
	res.locals = {type_user:0};
	return next();
}