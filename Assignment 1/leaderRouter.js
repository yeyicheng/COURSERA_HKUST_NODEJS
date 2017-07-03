var express = require('express');
var router = express.Router();

router.all('/leadership', function(req, res, next) {
	res.writeHead(200, { 
		'Content-Type': 'text/plain'
	});
	next();
});

router.get('/leadership', function(req, res, next) {
	res.end("Will send all the leadership to you!");
});

router.post('/leadership', function(req, res, next) {
	res.end('Will add the leadership: ' + req.body.name + ' with details: ' + req.body.description);
});

router.delete('/leadership', function(req, res, next) {
	res.end('Deleting all leadership');
});

router.get("/leadership/:leadershipId", function(req, res, next) {
	res.end('Will send details of the leadership: ' + req.params.leadershipId + ' to you!');
});

router.put("/leadership/:leadershipId", function(req, res, next) {
	res.write('Updating the leadership: ' + req.params.leadershipId + '\n');
    res.end('Will update the leadership: ' + req.body.name + ' with details: ' + req.body.description);
});

router.delete("/leadership/:leadershipId", function(req, res, next) {
    res.end('Deleting leadership: ' + req.params.leadershipId);
});

module.exports = router;