const Promise = require('bluebird');
const models = require('./main');
const reader = require('../../libs/reader');
const articleModel = require('./article');

const getFeedPromise = reader.getFeedPromise;
const Feed = models.Feed;
const Article = models.Article;

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

const findAndCreate = (url, cb) => {
  Feed.findOne({url: url}, (err, feed) => {
    if (feed) {
      // later, we will want to look for articles belong to the feed
      articleModel.findArticlesByFeedId(feed._id, (err, articles) => {
        if (err) {
          cb(err, null);
        } else {
          cb(null, {main:feed, articles: articles});
        }        
      })      
    } else {
      create(url, (err, feed) => {
        cb(err, feed);
      });
    }
  })
}

const create = (url, cb) => {
  getFeedPromise(url).then((feed) => {
    const feedSummary = {
      url: url,
      title: feed['title'],
      description: feed['description'],
      language: feed['language'],
      link: feed['link'],
      items: feed.items    
    }    
    return feedSummary;           
  })
  .then((feedSummary) => {
    const feed = new Feed(feedSummary);
    return feed.save();
  })
  .then((feed) => {   
    cb(null, feed);
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
  get: get,
  getAll: getAll,
  findAndCreate: findAndCreate,
  destroy: destroy,
  // findByUrl: findByUrl,
}
