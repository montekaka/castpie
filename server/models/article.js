const _ = require('underscore');
const models = require('./main');

const Article = models.Article;

insertDifference = (items, existItems) => {
  
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
