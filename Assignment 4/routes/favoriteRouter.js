var express = require('express');
var router = express.Router();
var Verify = require('./verify');
var Favorite = require('../models/favorite');

router.route('/').all(Verify.verifyOrdinaryUser)

.get(function(req, res, next) {
	Favorite.find({ postedBy: req.decoded._doc._id })
        .populate('postedBy').populate("dishes")
        .exec(function (err, favorite) {
        if (err) throw err;
        res.json(favorite);
    });
})

.post(function(req, res, next) {
	Favorite.find({ postedBy: req.decoded._doc._id })
        .exec(function (err, favorite) {
        if (err) throw err;
		console.log(favorite)
        if (favorite.length == 0) {
			req.body.postedBy = req.decoded._doc._id;
			req.body.dishes = [req.body._id];
			Favorite.create(req.body, function (err, favorite) {
				if (err) throw err;
				res.json(favorite);
			});
		} else {
			var flag = true;
			for (var i = 0; i < favorite[0].dishes.length; i++) {
				if (favorite[0].dishes[i] == req.body._id) {
					res.send("Favorite already exists!");
					flag = false;
					break;
				}
			}
			if (flag) {
				favorite[0].dishes.push(req.body._id);
				favorite[0].save(function (err, fav) {
					if (err) throw err;
					res.json(fav);
				});
			}
		}
    });

})

.delete(function(req, res, next) {
	Favorite.find({ postedBy: req.decoded._doc._id }, function (err, favorite) {
        if (err) throw err;
        if (favorite.length == 1) {
			favorite[0].remove();
		}
		res.end('Deleted all favorites!');
    });
});

router.route("/:dishObjectId")
.delete(Verify.verifyOrdinaryUser, function(req, res, next) {
	Favorite.find({ postedBy: req.decoded._doc._id }, function (err, favorite) {
        if (err) throw err;
        if (favorite.length == 1) {
			for (var i = 0; i < favorite[0].dishes.length; i++) {
				if (favorite[0].dishes[i] == req.params.dishObjectId) {
					favorite[0].dishes.splice(i, 1);
					break;
				}
			}
		}
		favorite[0].save(function (err, fav) {
			if (err) throw err;
			res.json(fav);
		});
    });
});
module.exports = router;

