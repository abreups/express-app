var http = require('http'); // Include the Node HTTP library
var express = require('express'); // Include the Express module
var app = express(); // Create an instance of Express
var iniparser = require('iniparser'); // Load the iniparser module
var fs = require('fs'); // manipula arquivos

var config = iniparser.parseSync('./config.ini');
// console.log(config);

app.set('view engine', 'jade'); // Set the view engine
app.set('views', './views'); // Where to find the view files

app.use(express.static('./public')); // Mark the public dir as a static dir
app.use(express.responseTime()); // add the responseTime middleware
app.use(app.router); // Explicitly add the router middleware

// Setup for production environment
if ('production' == app.get('env')) {
	app.get('/', function(req, res) {
		res.render('index', {title:config.title, message:config.message});
	});
}

// Setup for development environment
if ('development' == app.get('env')) {
	app.use(express.errorHandler()); // add the errorHandler middleware
	app.use(express.logger({
		format: 'default',
		stream: fs.createWriteStream('app.log', {'flags': 'w'})
	})); // add logger middleware
	app.get('/', function(req, res) {
		res.send('development mode test');
		});
}

// Common setup for all the environments
app.get('/test', function(req, res) {
	res.send('works on all environments');
});

// Start the app
http.createServer(app).listen(3000, function() {
	console.log('App started on port ' + config.port);
});

// Mostra no console o valor de 'env' (default is 'development')
console.log(app.get('env'));

