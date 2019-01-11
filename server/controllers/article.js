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

const getMp3 = (req, res) => {
  const id = req.params.id;
  articleModel.doPolly(id, (err, article) => {
    if(err) {
      res.sendStatus(404);
    } else {
      res.send({audioUrl: article.audioUrl});
    }
  });    
}

module.exports = {
  post: post,
  getMp3: getMp3
}