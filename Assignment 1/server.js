var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var dishes = require('./dishRouter');
var promotions = require('./promoRouter');
var leadership = require('./leaderRouter');

var hostname = 'localhost';
var port = 3000;

var app = express();
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(dishes)
app.use(promotions);
app.use(leadership);

app.use(express.static(__dirname + '/public'));

app.listen(port, hostname, function() {
	console.log("Server running at http://" + hostname + ":" + port + "/");
})