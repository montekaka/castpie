const Promise = require('bluebird');
const models = require('./main');
const reader = require('../../libs/reader');
const pollytalk = require('../../libs/pollytalk');
const articleModel = require('./article');

const getFeedPromise = reader.getFeedPromise;
const deleteFileFromDOPromise = pollytalk.deleteFileFromDOPromise;
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
          // item['audioFileName']
          let audioFileName = item['title'].split('/').join(" ");
          item['audioFileName'] = audioFileName.split(",").join("");

          item['audioFormat'] = "mp3";
          item['bucketText'] = reader.getBuckets(item["content:encoded"]);
          item['images'] = reader.getImages(item["content:encoded"]);
        });
        
        articleModel.insertMany(items, (err, articles) => {
          if (err) {
            cb(err, null);
          } else {
            cb(null, {main:feedSummary, articles: articles})
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
  // before delete the feed, we will like to delete all the articles associate with it
  // we will like to delete the mp3 file in DO as well
  articleModel.destroyAllByFeedId(id, (err) => {
    if(err) {
      cb(err, null);
    } else {
      deleteFileFromDOPromise(id).then(() => {
        Feed.deleteOne({_id: id}, (err) => {
          if (err) {
            cb(err, null); 
          } else {
            cb(null, {message: `Deleted ${id}`});
          }
        });
      })
      .catch((err) => {
        cb(err, null); 
      })
    }
  })
}

const getArticles = (id, cb) => {
  var query = Article.find({feedId: id});
  query.exec((err, articles) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, articles);
    }
  });
}

module.exports = {
  get: get,
  getAll: getAll,
  findAndCreate: findAndCreate,
  destroy: destroy,
  getArticles: getArticles
  // findByUrl: findByUrl,
}
