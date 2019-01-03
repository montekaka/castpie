const reader = require('../../libs/reader');

const getFeedPromise = reader.getFeedPromise;

module.exports = {
  post: (req, res) => {
    const url = req.body['url'];
    getFeedPromise(url).then((feed) => {
      res.send(feed);
    }).catch((err) => {
      res.sendStatus(404);
    });    
  }
}