//Import the mongoose module
const mongoose = require('mongoose');
const mongoDB = 'mongodb://127.0.0.1/mongo_polly';
const models = require('./main');

const promise = mongoose.connect(mongoDB);
const feedModel = models.Feed;

promise.then((db) => {
  console.log('woohoo mongoose connected successfully');
}).catch((err) => {
  console.log('mongoose connection error, please make sure your mongodb is running.');  
});

var db = mongoose.connection;

module.exports = {
  feedModel: feedModel
}
