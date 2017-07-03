var express = require('express');
var router = express.Router();

router.all('/promotions', function(req, res, next) {
	res.writeHead(200, { 
		'Content-Type': 'text/plain'
	});
	next();
});

router.get('/promotions', function(req, res, next) {
	res.end("Will send all the promotions to you!");
});

router.post('/promotions', function(req, res, next) {
	res.end('Will add the promotion: ' + req.body.name + ' with details: ' + req.body.description);
});

router.delete('/promotions', function(req, res, next) {
	res.end('Deleting all promotions');
});

router.get("/promotions/:promotionId", function(req, res, next) {
	res.end('Will send details of the promotion: ' + req.params.promotionId + ' to you!');
});

router.put("/promotions/:promotionId", function(req, res, next) {
	res.write('Updating the promotion: ' + req.params.promotionId + '\n');
    res.end('Will update the promotion: ' + req.body.name + ' with details: ' + req.body.description);
});

router.delete("/promotions/:promotionId", function(req, res, next) {
    res.end('Deleting promotion: ' + req.params.promotionId);
});

module.exports = router;