var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
	id: Number,
	postId: Number,
	date: Date,
	title: String,
	body: String,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	comments: [{
		date: Date,
		body: String,
		userName: String
	}]
});	

module.exports = mongoose.model("Post", PostSchema);
