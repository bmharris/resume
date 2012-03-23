var express = require('express'),
	app = express.createServer(),
	controller = require('./controllers/main.js');


app.configure(function(){
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
	app.set('view options', {
		layout: false,
	});
	app.set('view cache', false);

	app.use(express.bodyParser());
	app.use(express.static(__dirname + '/static'));
	app.use(app.router);
});


app.get('/', controller.index);
app.get('/test/', controller.test);
app.get('/less/:filename.css', require('./controllers/less.js').compile);
app.listen(8001);

//Setup socket.io stats
require('./stats').register(app);

console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
