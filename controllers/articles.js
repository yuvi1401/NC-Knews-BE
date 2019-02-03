const {
  fetchArticles,
  fetchArticleById,
  deleteArticle,
  patchVotes,
  fetchCommentsByArticleId,
  addCommentByArticleId,
  patchVotesComment,
  deleteComment,
} = require('../models/articles');

exports.getArticles = (req, res, next) => {
  const {
    limit = 10, sort_by = 'created_at', p = 1, order = 'desc',
  } = req.query;
  return fetchArticles(limit, sort_by, p, order)
    .then((articles) => {
      if (articles.length === 0) next({ status: 404 });
      else res.status(200).send({ articles });
    })
    .catch(next);
};

exports.getArticleById = (req, res, next) => {
  const id = { 'articles.article_id': req.params.article_id };
  return fetchArticleById(id)
    .then(([article]) => {
      if (!article) next({ status: 404 });
      else res.status(200).send({ article });
    })
    .catch(next);
};

exports.deleteArticleById = (req, res, next) => {
  const { article_id } = req.params;

  deleteArticle(article_id)
    .then(deleteBlock => res.status(204).send())
    .catch(next);
};

exports.patchVotesByArticleId = (req, res, next) => {
  const { inc_votes } = req.body;
  const { article_id } = req.params;

  return patchVotes(article_id, inc_votes)
    .then(([article]) => {
      if (!article) next({ status: 404 });
      else res.status(200).send(article);
    })
    .catch(next);
};

exports.getCommentsByArticleId = (req, res, next) => {
  const {
    limit = 10, sort_by = 'created_at', p = 1, order = 'desc',
  } = req.query;

  const sortOrder = ['comment_id', 'votes', 'author', 'created_at', 'body'];
  const sort_by_selection = sortOrder.includes(sort_by) ? sort_by : 'created_at';
  const orderSelection = order === 'asc' ? 'asc' : 'desc';

  return fetchCommentsByArticleId(req.params, limit, sort_by_selection, p, orderSelection)
    .then((comments) => {
      if (!comments) next({ status: 404 });
      else res.status(200).send({ comments });
    })
    .catch(next);
};
exports.postCommentByArticleId = (req, res, next) => {
  const { body } = req;

  body.article_id = req.params.article_id;

  return addCommentByArticleId(body)
    .then(([comment]) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};
exports.patchArticleComment = (req, res, next) => patchVotesComment(req.body, req.params)
  .then(([comment]) => {
    if (!comment) next({ status: 404 });
    else res.status(200).send({ comment });
  })
  .catch(next);

exports.deleteCommentById = (req, res, next) => {
  const { article_id } = req.params;
  const { comment_id } = req.params;
  deleteComment(article_id, comment_id)
    .then((deleted) => {
      res.status(204).send();
    })
    .catch(next);
};
