const controller = require('./controllers');
const router = require('express').Router();

router.post('/api/feed', controller.feed.post);
router.get('/api/feed', controller.feed.get);
router.get('/api/feed/:id/articles', controller.feed.getArticles);
router.get('/api/feed/:id', controller.feed.get);
router.delete('/api/feed/:id', controller.feed.destroy);
router.post('/api/articles', controller.article.post);
router.get('/api/articles/:id/mp3', controller.article.getMp3);

module.exports = router;
