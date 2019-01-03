const Parser = require('rss-parser');
const Promise = require('bluebird');
const htmlParse = require('node-html-parser');

let parser = new Parser();
const parse = htmlParse.parse;

const getFeedPromise = (url) => {
  return new Promise((resolve, reject) => {
    parser.parseURL(url, (err, feed) => {
      if (err) {
        reject(err);
      }
      resolve(feed);
    })
  })
}

const getImages = (text) => {
  const imgs = parse(text).querySelectorAll('img');
  let images = imgs.map((img) => {
    if(img) {
      return {src: img.attributes.src, 'data-width':img.attributes.width, 'data-height':img.attributes.height}
    }    
  });
  return images;
}

const getBuckets = (text) => {
  // 3,000 characters limit
  // default k = 100 words per bucket
  let document = parse(text).text.toString();
  let words = document.split(' ');
  var buckets = [];
  var _bucket = [];
  for(var i = 0; i < words.length; i++) {
    if(i % 100 === 0 && i > 0) {
      let paragraph = _bucket.join(' ');
      buckets.push(paragraph);
    }        
    if(i % 100 === 0) {
      _bucket = [];
    }
    _bucket.push(words[i]);
  }  
  buckets.push(_bucket.join(' '));
  return buckets;
}

module.exports = {
  getFeedPromise: getFeedPromise,
  getBuckets: getBuckets,
  getImages: getImages
};
