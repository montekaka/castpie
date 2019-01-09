const pollytalk = require('./../../libs/pollytalk');
const Promise = require('bluebird');
const _ = require('underscore');
const articleModel = require('./../models/article');

const post = (req, res) => {
  const id = req.body['id'];
  articleModel.doPolly(id, (err, article) => {
    if(err) {
      res.sendStatus(404);
    } else {
      res.send(article);
    }
  });    
}

module.exports = {
  post: post
}