const articlesRouter = require('express').Router();

const { getArticles, getArticleById, deleteArticleById } = require('../controllers/articles');

articlesRouter.get('/', getArticles);

articlesRouter.get('/:article_id', getArticleById);

articlesRouter.delete('/:article_id', deleteArticleById);

module.exports = articlesRouter;
