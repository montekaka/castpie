const mongoose = require('mongoose');

//Define a schemas
const Schema = mongoose.Schema;
const FeedModelSchema = new Schema({
	url: String,
  title: String,
  description: String,
  language: String,
  link: String,
  imageUrl: String,
  refreshedDate: {type: Date, default: Date.now}, 
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
    src: String,
    "data-width": String,
    "data-height": String
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

// const thing = new Article({feedId: {type: 'ObjectId', ref: 'Feed'}});
// thing.save();

module.exports = {
  Feed: Feed,
  Article: Article,
}
