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
const { handle405 } = require('../error/index');

articlesRouter.get('/', getArticles).all(handle405);

articlesRouter
  .route('/:article_id')
  .get(getArticleById)
  .delete(deleteArticleById)
  .patch(patchVotesByArticleId)
  .all(handle405);

articlesRouter
  .route('/:article_id/comments')
  .get(getCommentsByArticleId)
  .post(postCommentByArticleId)
  .all(handle405);

articlesRouter
  .route('/:article_id/comments/:comment_id')
  .patch(patchArticleComment)
  .delete(deleteCommentById)
  .all(handle405);

module.exports = articlesRouter;
