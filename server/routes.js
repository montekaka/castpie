const controller = require('./controllers');
const router = require('express').Router();

router.get('/api/articles', controller.articles.get);

module.exports = router;
