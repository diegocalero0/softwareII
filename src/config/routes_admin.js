var express = require("express");

var router = express.Router();

router.get("/", function(req, res){
	res.render("admin/home");
});

router.get("/agregarProducto", function(req, res){
	res.render("admin/agregarProducto");
});

module.exports = router;