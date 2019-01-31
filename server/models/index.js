//Import the mongoose module
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();
let mongoDB = 'mongodb://206.189.76.54:27017/mongo_polly';
if( process.env.NODE_ENV === 'development') {
  mongoDB = 'mongodb://127.0.0.1/mongo_polly';
}
const models = require('./main');

const promise = mongoose.connect(mongoDB);
const feedModel = models.Feed;

promise.then((db) => {
  console.log('woohoo mongoose connected successfully');
}).catch((err) => {
  console.log(`${mongoDB} mongoose connection error, please make sure your mongodb is running.`);  
});

var db = mongoose.connection;

module.exports = {
  feedModel: feedModel
}
