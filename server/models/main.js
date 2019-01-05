

const mongoose = require('mongoose');

//Define a schemas
const Schema = mongoose.Schema;
const FeedModelSchema = new Schema({
	url: String,
  title: String,
  description: String,
  language: String,
  link: String,
	updateDate: {type: Date, default: Date.now},
	createdDate: {type: Date, default: Date.now}	
});

const ArticleModelSchema = new Schema({
  feedId: {type: 'ObjectId', ref: 'Feed'},
  link: String,
  guid: String,
  rawTitle: String,
  rawText: String,  
  creator: String,
  pubDate: Date,  
  // from here is our own manipulation
  images: [{
    url: String,
    width: String,
    height: String
  }],
  language: String,
  bucketText: [String],
  audioFileName: String,
  audioUrl: String,
  audioFormat: String,  
	updateDate: {type: Date, default: Date.now},
	createdDate: {type: Date, default: Date.now}		
})


const Feed = mongoose.model('Feed', FeedModelSchema);
const Article = mongoose.model('Article', ArticleModelSchema);

module.exports = {
  Feed: Feed,
  Article: Article,
}
