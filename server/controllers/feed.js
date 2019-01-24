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

const put = (req, res) => {
  const id = req.params.id;
  // premitted update columns
  let changes = {};
  if ( req.body['refreshedDate'] ) {
    changes['refreshedDate'] = new Date(req.body['refreshedDate']);
  }
  if (changes !== {}) {
    feedModel.update(id, changes, (err, feed) => {
      if (err) {
        res.sendStatus(404);
      } else {
        res.send(feed);
      }
    })
  } else {
    get(req, res);
  }
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

const getArticles = (req, res) => {
  const id = req.params.id;
  feedModel.getArticles(id, (err, articles) => {    
    if (err) {
      res.sendStatus(404);
    } else {
      res.send(articles);
    }    
  })
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
  put: put,
  destroy: destroy,
  getArticles: getArticles
}
