var app = require("./app");

var hostname = 'localhost';
var port = 3000;

app.listen(port, hostname, function() {
	console.log("Server running at http://" + hostname + ":" + port + "/");
})