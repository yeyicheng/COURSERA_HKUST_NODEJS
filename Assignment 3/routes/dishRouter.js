var express = require('express');
var router = express.Router();
var Verify = require('./verify');

router.get('/', Verify.verifyOrdinaryUser, function(req, res, next) {
	res.end('respond with a resource');
});

router.post('/', Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
	res.end('Will add the dish: ' + req.body.name + ' with details: ' + req.body.description);
});

router.delete('/', Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
	res.end('Deleting all dishes');
});

router.get("/:dishId", function(req, res, next) {
	res.end('Will send details of the dish: ' + req.params.dishId + ' to you!');
});

router.put("/:dishId", Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
	res.write('Updating the dish: ' + req.params.dishId + '\n');
    res.end('Will update the dish: ' + req.body.name + ' with details: ' + req.body.description);
});

router.delete("/:dishId", Verify.verifyOrdinaryUser, Verify.verifyAdmin, function(req, res, next) {
    res.end('Deleting dish: ' + req.params.dishId);
});

module.exports = router;

