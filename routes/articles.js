const articlesRouter = require('express').Router();

const { getArticles, getArticleById } = require('../controllers/articles');

articlesRouter.get('/', getArticles);

articlesRouter.get('/:article_id', getArticleById);

module.exports = articlesRouter;
