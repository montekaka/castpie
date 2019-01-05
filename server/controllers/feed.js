const feedModel = require('./../models/feed');

const post = (req, res) => {
  const url = req.body['url'];
  feedModel.findAndCreate(url, (err, feed) => {
    if(err) {
      res.sendStatus(404);
    } else {
      res.send(feed);
    }
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
