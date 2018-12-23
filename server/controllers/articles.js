const reader = require('./../../libs/reader');
const Promise = require('bluebird');
const _ = require('underscore');
const fs = require('fs');

const getArticle = reader.getArticle;
const pollyPromise = reader.pollyPromise;
const saveFilePromise = reader.saveFilePromise;
const mergeFilesPromise = reader.mergeFilesPromise;

module.exports = {
  get: (req, res) => {
    getArticle('http://stratechery.com/feed/', 9, (article) => {
      const document = article.summaryText;
      const title = article.item.title;
      var files = [];
      for(var i = 0; i < document.length; i++) {
        const text = document[i];
        let params = {
          'Text': text,
          'OutputFormat': 'mp3',
          'VoiceId': 'Kimberly'          
        }
        let filename = `./tmp/${title} ${i+1}.mp3`
        file = {
          params: params,
          filename: filename
        }
        files.push(file);
      }

      let savedFiles = _.map(files, (file) => {
        return file.filename;
      });
      
      let finalFilename = `./tmp/${title}.mp3`;
      
      Promise.map(files, (file) => {
        let params = file.params;
        let filename = file.filename;
        return pollyPromise(params).then((audioStream) => {
          return saveFilePromise(audioStream, filename)
        }).then((savedFileName) => {
          console.log(savedFileName);
        })
        .catch((err) => {
          res.send(err);      
        });
      }, {
        concurrency: 4
      })
      .then(() => {
        return files;
      })
      .then((files) => {
        return mergeFilesPromise(files, finalFilename);
      })
      .then((filename) => {        
        return Promise.map(savedFiles, (savedFile) => {
          fs.unlinkSync(savedFile);
        }, {
          concurrency: 4
        })      
      })
      .then(() => {
        res.send(document);
      })

    });
  }
}