const app = require('./config/server');
require('./app/routes/ventas')(app);

//inicializar servidor
app.listen(app.get('port'), () => {
	console.log('server on port', app.get('port'));
});