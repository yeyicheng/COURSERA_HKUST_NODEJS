var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var favoriteSchema = new Schema({
    postedBy: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	dishes: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Dish'
	}]
}, { 
	timestamps: true 
});

var Favorite = mongoose.model('Favorite', favoriteSchema);

// make this available to our Node applications
module.exports = Favorite;