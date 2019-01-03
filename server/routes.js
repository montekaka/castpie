const controller = require('./controllers');
const router = require('express').Router();

router.post('/api/feed', controller.feed.post);
router.post('/api/article', controller.article.post);

module.exports = router;
