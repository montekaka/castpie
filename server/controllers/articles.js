const reader = require('./../../libs/reader');

const getArticlesPromise = reader.getArticlesPromise;

module.exports = {
  post: (req, res) => {
    const url = req.body['url'];
    getArticlesPromise(url).then((feed) => {
      res.send(feed);
    }).catch((err) => {
      res.sendStatus(404);
    });    
  }
}