const dbConnection = require("../../config/dbConnection")

module.exports = function (app){

	const connection = dbConnection();

	app.get("/", function(req, res){
		res.render("index");
	});

}

