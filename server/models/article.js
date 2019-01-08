const Promise = require('bluebird');
const _ = require('underscore');
const models = require('./main');

const Article = models.Article;

insertDifference = (items, existItems, cb) => {
  const newItems = difference(items, existItems);
  cb(newItems);
}

findArticlesByFeedId = (feedId, cb) => {
  var query = Article.find({}).where('feedId').equals(feedId);
  query.exec((err, articles) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, articles);
    }
  })
}

// we might want to move this one to libs
difference = (items, existItems) => {
  const _existItems = _.map(items, (item) => { return item.link});
  var newItems = [];
  for (var i = 0; i < items.length; i++) {
    var item = items[i];
    if( !_.contains(_existItems, item.link)) {
      newItems.push(item);
    }
  }
  return newItems;
}

insertMany = (items, cb) => {
  Article.insertMany(items, (err, articles) => {
    cb(err, articles);
  })
}

module.exports = {
  insertDifference: insertDifference,
  findArticlesByFeedId: findArticlesByFeedId,
  insertMany: insertMany
}