const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;
const FeedModelSchema = new Schema({
	url: String,
    author: String,
    title: String,
    description: String,
	updateDate: {type: Date, default: Date.now},
	createdDate: {type: Date, default: Date.now}	
});

const Feed = mongoose.model('Feed', FeedModelSchema);

module.exports.Feed = Feed;