const pollytalk = require('./../../libs/pollytalk');
const Promise = require('bluebird');
const _ = require('underscore');

module.exports = {
  post: (req, res) => {
    const title = req.body['title'];    
    const randomNum = Math.floor(Math.random() * 100) + 2;
    let finalFilename = `./tmp/${title}${randomNum}.mp3`;
    const baseParams = {
      'OutputFormat': req.body['outputFormat'],
      'VoiceId': req.body['voiceId']
    }
    const files = pollytalk.getBucketFiles(req.body['text'], title, baseParams);
    let savedFiles = _.map(files, (file) => {return file.filename});
    Promise.map(files, (file) => {      
      return pollytalk.pollyPromise(file.params).then((audioStream) => {
        return pollytalk.saveFilePromise(audioStream, file.filename)
      })
      .then((savedFileName) => {
        console.log(savedFileName)
      })
      .catch((err) => {
        console.log(err);
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
      return pollytalk.uploadFileToDOPromise(finalFilename, `${title}.mp3`)
    })
    .then((data) => {
      res.send(data)
      return pollytalk.removeFilePromise(finalFilename).then(() => {
        console.log('deleted file')  
      })
    })
    .catch((err) => {
      console.log(err);
      res.status(500)
    })
  }
}