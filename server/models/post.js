var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
	date: Date,
	title: String,
	body: String,
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	},
	comments: [{
		postId: String,
		date: Date,
		body: String,
		userName: String

	}]
});	

module.exports = mongoose.model("Post", PostSchema);
