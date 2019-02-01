const articlesRouter = require('express').Router();

const {
  getArticles,
  getArticleById,
  deleteArticleById,
  patchVotesByArticleId,
} = require('../controllers/articles');

articlesRouter.get('/', getArticles);

articlesRouter.get('/:article_id', getArticleById);

articlesRouter.delete('/:article_id', deleteArticleById);

articlesRouter.patch('/:article_id', patchVotesByArticleId);

module.exports = articlesRouter;
