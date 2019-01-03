const mongoose = require('mongoose');

//Define a schema
const Schema = mongoose.Schema;
const FeedModelSchema = new Schema({
	url: String,
  title: String,
  description: String,
  language: String,
  link: String,
	updateDate: {type: Date, default: Date.now},
	createdDate: {type: Date, default: Date.now}	
});

const Feed = mongoose.model('Feed', FeedModelSchema);

// const get = (req, res) => {
//   const id = req.params.id;
//   if (id) {
//     Feed.findOne({_id: id}, (err, feed) => {
//       if (err) {
//         res.sendStatus(404);
//       } else {
//         res.json(feed);
//       }
//     })
//   }

//   Feed.find({}).then((feed) => {
//     res.json(feed);
//   }).catch((err) => {
//     console.log(err);
//     res.sendStatus(404);    
//   })
// }

// const findByUrl = (req, res) => {
//   const feedUrl = req.body['feedUrl'];
//   Feed.findOne({url: feedUrl}, (err, feed) => {
//     if (err) {
//       res.sendStatus(404);
//     } else {
//       res.json(feed);
//     }    
//   })
// }

const create = (item, cb) => {
  // if the url has been inserted, then return the feed, else create a new one
  Feed.findOne({url: item.url}, (err, feed) => {
    if (feed) {
      cb(null, feed);
    } else {
      Feed.create(item, (err, _feed) => {
        if (err) {
          cb(err, null);
        } else {
          cb(null, _feed);
        }
      })      
    }
  });
}

// const destroy = (req, res) => {
//   const _id = req.params.id;
//   Feed.deleteOne({id: _id}, (err) => {
//     if (err) {
//       res.sendStatus(404); 
//     } else {
//       res.json({message: `Deleted ${_id}`});
//     }
//   });
// }

module.exports = {
  Feed: Feed,
  // get: get,
  create: create,
  // destroy: destroy,
  // findByUrl: findByUrl,
}
