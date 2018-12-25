const Parser = require('rss-parser');
const Promise = require('bluebird');

let parser = new Parser();

const getArticlesPromise = (url) => {
  return new Promise((resolve, reject) => {
    parser.parseURL(url, (err, feed) => {
      if (err) {
        reject(err);
      }
      resolve(feed);
    })
  })
}


module.exports = {
  getArticlesPromise: getArticlesPromise
};
