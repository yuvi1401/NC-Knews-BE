const articlesRouter = require('express').Router();

const {
  getArticles,
  getArticleById,
  deleteArticleById,
  patchVotesByArticleId,
  getCommentsByArticleId,
  postCommentByArticleId,
  patchArticleComment,
  deleteCommentById,
} = require('../controllers/articles');

articlesRouter.get('/', getArticles);

articlesRouter.get('/:article_id', getArticleById);

articlesRouter.delete('/:article_id', deleteArticleById);

articlesRouter.patch('/:article_id', patchVotesByArticleId);

articlesRouter.get('/:article_id/comments', getCommentsByArticleId);

articlesRouter.post('/:article_id/comments', postCommentByArticleId);

articlesRouter.patch('/:article_id/comments/:comment_id', patchArticleComment);

articlesRouter.delete('/:article_id/comments/:comment_id', deleteCommentById);

module.exports = articlesRouter;
