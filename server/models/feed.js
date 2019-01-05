const mongoose = require('mongoose');
const reader = require('../../libs/reader');

const getFeedPromise = reader.getFeedPromise;
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

// getFeedPromise(url).then((feed) => {
//   const item = {
//     url: url,
//     title: feed['title'],
//     description: feed['description'],
//     language: feed['language'],
//     link: feed['link']      
//   }

//   // res.send(feed);
// }).catch((err) => {
//   res.sendStatus(404);
// });  

const findAndCreate = (url, cb) => {
  Feed.findOne({url: url}, (err, feed) => {
    if (feed) {
      // later, we will want to look for articles belong to the feed
      cb(null, feed);
    } else {
      create(url, (err, feed) => {
        cb(err, feed);
      });
    }
  })
}

const create = (url, cb) => {
  getFeedPromise(url).then((feed) => {
    const item = {
      url: url,
      title: feed['title'],
      description: feed['description'],
      language: feed['language'],
      link: feed['link']      
    }
    Feed.create(item, (err, _feed) => {
      if (err) {
        cb(err, null);
      } else {
        cb(null, _feed);
        // we will create articles for the feed
      }
    });                       
  })
  .catch((err) => {
    cb(err, null);
  })
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
  findAndCreate: findAndCreate,
  destroy: destroy,
  // findByUrl: findByUrl,
}
