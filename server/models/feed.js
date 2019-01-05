const mongoose = require('mongoose');

//Define a schema
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

const Feed = mongoose.model('Feed', FeedModelSchema);

const get = (id, cb) => {
  Feed.findOne({_id: id}, (err, feed) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, feed);
    }
  })
}

const getAll = (cb) => {
  Feed.find({}).then((feed) => {
    cb(null, feed);
  }).catch((err) => {
    cb(err, null);
  })  
}


const create = (item, cb) => {
  // if the url has been inserted, then return the feed, else create a new one
  Feed.findOne({url: item.url}, (err, feed) => {
    if (feed) {
      cb(null, feed);
      // we will want to look for articles belong to the feed
    } else {
      Feed.create(item, (err, _feed) => {
        if (err) {
          cb(err, null);
        } else {
          cb(null, _feed);
          // we will create articles for the feed
        }
      })      
    }
  });
}

const destroy = (id, cb) => {
  Feed.deleteOne({_id: id}, (err) => {
    if (err) {
      cb(err, null); 
    } else {
      cb(null, {message: `Deleted ${id}`});
      //res.json({message: `Deleted ${_id}`});
    }
  });
}


module.exports = {
  Feed: Feed,
  get: get,
  getAll: getAll,
  create: create,
  destroy: destroy,
  // findByUrl: findByUrl,
}
