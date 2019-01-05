const reader = require('../../libs/reader');
const models = require('./../models/index');

const getFeedPromise = reader.getFeedPromise;
const feedModel = models.feedModel;

const post = (req, res) => {
  const url = req.body['url'];
  getFeedPromise(url).then((feed) => {
    const item = {
      url: url,
      title: feed['title'],
      description: feed['description'],
      language: feed['language'],
      link: feed['link']      
    }
    feedModel.create(item, (err, feed) => {
      if(err) {
        res.sendStatus(404);
      } else {
        res.send(feed);
      }
    })
    // res.send(feed);
  }).catch((err) => {
    res.sendStatus(404);
  });    
}

const get = (req, res) => {
  const id = req.params.id;
  if (id) {
    feedModel.get(id, (err, feed) => {
      if (err) {
        res.sendStatus(404);
      } else {
        res.send(feed);
      }
    })
  } else {
    feedModel.getAll((err, feed) => {
      if (err) {
        res.sendStatus(404);
      } else {
        res.send(feed);
      }
    })    
  }
}

const destroy = (req, res) => {
  const id = req.params.id;
  feedModel.destroy(id, (err, msg) => {
    if (err) {
      res.sendStatus(404);
    } else {
      res.send(msg);
    }
  })
}


module.exports = {
  get: get,
  post: post,
  destroy: destroy
}
