const articlesRouter = require('express').Router();

const {
  getArticles,
  getArticleById,
  deleteArticleById,
  patchVotesByArticleId,
  getCommentsByArticleId,
} = require('../controllers/articles');

articlesRouter.get('/', getArticles);

articlesRouter.get('/:article_id', getArticleById);

articlesRouter.delete('/:article_id', deleteArticleById);

articlesRouter.patch('/:article_id', patchVotesByArticleId);

articlesRouter.get('/:article_id/comments', getCommentsByArticleId);

module.exports = articlesRouter;
