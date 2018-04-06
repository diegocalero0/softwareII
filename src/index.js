const app = require('./config/server');
require('./app/routes/ventas')(app);

var server = require("http").Server(app);

var io = require("socket.io")(server);

const dbConnection = require("./config/dbConnection");
const connection = dbConnection();

io.on("connect", function(socket){
	connection.query("SELECT ID_PAIS, NOMBRE FROM PAIS", function(err, res, field){
		if(err){
			connection.end();
			return;
		}
		socket.emit("paises", res);
	});


	socket.on("departamentos", function(data){
		var id = data.id;
		connection.query("SELECT ID_DEPARTAMENTO, NOMBRE FROM DEPARTAMENTO WHERE ID_PAIS = ?", [id], function(err, res, field){
			if(err){
				connection.end();
				return;
			}
			socket.emit("departamentos", res);
		})
	});

	socket.on("municipios", function(data){
		var id = data.id;
		connection.query("SELECT ID, NOMBRE FROM CIUDAD WHERE ID_DEPARTAMENTO = ?", [id], function(err, res, field){
			if(err){
				connection.end();
				return;
			}
			socket.emit("municipios", res);
		})
	});

});
//inicializar servidor
server.listen(app.get('port'), () => {
	console.log('server on port', app.get('port'));
});