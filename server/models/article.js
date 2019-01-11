const Promise = require('bluebird');
const _ = require('underscore');
const models = require('./main');
const pollytalk = require('./../../libs/pollytalk');

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
// 5c34583e1ce1beb79923061a
// convert from text to audio, and save to DO, then update the mp3 url
doPolly = (id, cb) => {
  const query = Article.findOne({_id: id});
  query.exec((err, article) => {
    if (err) {
      cb(err, null);
    } else {
      if ( article.audioUrl ) {
        cb(null, article)
      } else {
        const text = article.rawText;
        const language = article.language;
        const title = article.rawTitle;
        const mergedFileName = article.audioFileName;
        const randomNum = Math.floor(Math.random() * 100) + 2;
        let finalFilename = `./tmp/${mergedFileName}${randomNum}.mp3`;
        const baseParams = {
          'OutputFormat': article.audioFormat,
          'VoiceId': 'Kimberly',
          LanguageCode: language
        }      
        const files = pollytalk.getBucketFiles(text, title, baseParams);
        let savedFiles = _.map(files, (file) => {return file.filename});
        Promise.map(files, (file) => {      
          return pollytalk.pollyPromise(file.params).then((audioStream) => {
            return pollytalk.saveFilePromise(audioStream, file.filename)
          })
          .then((savedFileName) => {
            console.log(savedFileName)
          })
          .catch((err) => {
            console.log('polly error', err);
          },{
            concurrency: 4
          });      
        })
        .then(() => {
          return files
        })
        .then((files) => {
          return pollytalk.mergeFilesPromise(files, finalFilename);
        })
        .then(() => {
          return pollytalk.removeFilesPromise(savedFiles);
        })
        .then(() => {      
          return pollytalk.uploadFileToDOPromise(finalFilename, `${mergedFileName}.mp3`)
        })
        .then((data) => { 
          console.log(id)
          Article.findByIdAndUpdate(id, { $set: {audioUrl: data}}, {new: true}, (err, res) => {
            if (err) {
              cb(err, null);
            } else {
              cb(null, res);
            }
          })
          return pollytalk.removeFilePromise(finalFilename);
        })
        .catch((err) => {
          cb(err, null);
        })
      }      
    }
  });
}

module.exports = {
  insertDifference: insertDifference,
  findArticlesByFeedId: findArticlesByFeedId,
  insertMany: insertMany,
  doPolly: doPolly
}