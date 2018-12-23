const Parser = require('rss-parser');
const htmlParse = require('node-html-parser');
const AWS = require('aws-sdk');
const fs = require('fs');

let parser = new Parser();
const parse = htmlParse.parse;

// let params = {
//   'OutputFormat': 'mp3',
//   'VoiceId': 'Kimberly'
// }

const pollyPromise = (params) => {
  // Create an Polly client
  const Polly = new AWS.Polly({
    signatureVersion: 'v4',
    region: 'us-east-1'
  });

  return new Promise((resolve, reject) => {
    Polly.synthesizeSpeech(params, (err, data) => {
      if (err) {
        reject(err)
      } else if (data) {
        if (data.AudioStream instanceof Buffer) {
          resolve(data.AudioStream);
        }
      }
    })
  })
};

const saveFilePromise = (audioStream, filename) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, audioStream, (err) => {
      if (err) {
        reject(err)
      }
      resolve(filename)
    })
  })
}

const mergeFilesPromise = (files, filename) => {
  return new Promise((resolve, reject) => {
    fs.writeFileSync(filename);
    files.forEach((file) => {
      let readfile = fs.readFileSync(file.filename);
      fs.appendFileSync(filename, readfile);
    });
    resolve(filename);
  })
}

const rss = (feedUrl, cb) => {
  parser.parseURL(feedUrl, (err, feed) => {
    cb(feed);
  })
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

const getArticle = (url, articleNumber, cb) => {
  rss(url, (feed) => {   
    let text = getBuckets(feed.items[articleNumber]['content:encoded']);
    let result = {
      item: feed.items[articleNumber],
      summaryText: text
    }; 
    cb(result)
  })
}

module.exports = {
  rssReader: rss,
  getBuckets: getBuckets,
  getArticle: getArticle,
  pollyPromise: pollyPromise,
  saveFilePromise: saveFilePromise,
  mergeFilesPromise: mergeFilesPromise
};
