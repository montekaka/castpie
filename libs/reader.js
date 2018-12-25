const Parser = require('rss-parser');
const htmlParse = require('node-html-parser');
const AWS = require('aws-sdk');
const fs = require('fs');
const Promise = require('bluebird');

let parser = new Parser();
const parse = htmlParse.parse;
// Create an Polly client
const Polly = new AWS.Polly({
  signatureVersion: 'v4',
  region: 'us-east-1'
});

const pollyPromise = (params) => {
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

const getBucketFiles = (text, title, baseParams) => {
  const document = getBuckets(text);
  const randomNum = Math.floor(Math.random() * 100) + 2;

  var files = [];
  for(var i = 0; i < document.length; i++) {
    const fileText = document[i];
    let params = {
      'Text': fileText,
      'OutputFormat': baseParams.OutputFormat,
      'VoiceId': baseParams.VoiceId
    }
    let filename = `./tmp/${title}${randomNum}${i+1}.mp3`
    let file = {params: params, filename: filename};
    files.push(file);
  }

  return files;
}

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

const removeFilesPromise = (files) => {
  return Promise.map(files, (file) => {
    fs.unlinkSync(file);
  }, {
    concurrency: 4
  }).then(() => {
    return true
  })
}

module.exports = {
  pollyPromise: pollyPromise,
  saveFilePromise: saveFilePromise,
  mergeFilesPromise: mergeFilesPromise,
  getArticlesPromise: getArticlesPromise,
  removeFilesPromise: removeFilesPromise,
  getBucketFiles: getBucketFiles
};
