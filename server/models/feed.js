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
        const feedSummary = feed.feedSummary;
        const items = feed.items;
        items.forEach((item) => {
          item['language'] = feedSummary.language;
          item['feedId'] = feedSummary._id;
          item['rawTitle'] = item.title;
          item['rawText'] = item["content:encoded"];
          item['audioFileName'] = item['title'].split('/').join(" ");
          item['audioFormat'] = "mp3";
          item['bucketText'] = reader.getBuckets(item["content:encoded"]);
          item['images'] = reader.getImages(item["content:encoded"]);
        });
        
        articleModel.insertMany(items, (err, articles) => {
          if (err) {
            cb(err, null);
          } else {
            cb(null, feedSummary)
          }
        })
      });
    }
  })
}

const create = (url, cb) => {
  getFeedPromise(url).then((feed) => {
    let imageUrl;
    if(feed.image) {
      imageUrl = feed.image.url;
    }
    const feedSummary = {
      url: url,
      title: feed['title'],
      description: feed['description'],
      language: feed['language'],
      link: feed['link'],
      imageUrl: imageUrl,
      items: feed.items    
    }    
    return feedSummary;           
  })
  .then((feedSummary) => {
    const feed = new Feed(feedSummary);
    const promise = feed.save();
    return promise.then((f) => {
      return {feedSummary: f, items: feedSummary.items};
    })
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
