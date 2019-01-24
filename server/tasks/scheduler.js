const mongoose = require('mongoose');
const models = require('../models/index');
const feed = require('../models/feed');

// const mongoDB = 'mongodb://127.0.0.1/mongo_polly';
// const promise = mongoose.connect(mongoDB);

feed.refreshAll((err, res) => {
  if(err) {
    console.log(err)
  } else {
    console.log('successed')
  }
});

