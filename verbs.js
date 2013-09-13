var http = require('http');
var express = require('express');
var app = express();

// Include the router middleware
app.use(app.router);

app.all('/', function(req, res, next) {
	res.set('X-Catch-All', 'true');
	next();
});

// GET request to the root URL
app.get('/', function(req, res) {
	res.send('/ GET OK');
});

// POST request to the root URL
app.post('/', function(req, res) {
	res.send('/ POST OK');
});

// PUT request to the root URL
app.put('/', function(req, res) {
	res.send('/ PUT OK');
});

// PATCH request to the root URL
app.patch('/', function(req, res) {
	res.send('/ PATCH OK');
});

// DELETE request to the root URL
app.delete('/', function(req, res) {
	res.send('/ DELETE OK');
});

// OPTIONS request to the root URL
app.options('/', function(req, res) {
	res.send('/ OPTIONS OK');
});

// M-SEARCH request to the root URL
app['m-search']('/', function(req, res) {
	res.send('/ M-SEARCH OK');
});

// NOTIFY request to the root URL
app.notify('/', function(req, res) {
	res.send('/ NOTIFY OK');
});

// SUBSCRIBE request to the root URL
app.subscribe('/', function(req, res) {
	res.send('/ SUBSCRIBE OK');
});

// UNSUBSCRIBE request to the root URL
app.unsubscribe('/', function(req, res) {
	res.send('/ UNSUBSCRIBE OK');
});

// Start the server
http.createServer(app).listen(3000, function() {
	console.log('App started - port 3000');
});

