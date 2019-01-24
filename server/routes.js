const controller = require('./controllers');
const router = require('express').Router();

router.post('/api/feed', controller.feed.post);
router.get('/api/feed', controller.feed.get);
router.get('/api/feed/:id/articles', controller.feed.getArticles);
router.get('/api/feed/:id', controller.feed.get);
router.put('/api/feed/:id', controller.feed.put);
router.delete('/api/feed/:id', controller.feed.destroy);
router.post('/api/articles', controller.article.post);
router.get('/api/articles/:id/mp3', controller.article.getMp3);
router.delete('/api/articles/:id', controller.article.destroy);


module.exports = router;
