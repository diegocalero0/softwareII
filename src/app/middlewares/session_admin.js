module.exports = function(req, res, next){
	if(req.session.type_user != 0){
		return res.redirect("/");
	}
	return next();
}