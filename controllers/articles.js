const {
  fetchArticles, fetchArticleById, deleteArticle, patchVotes,
} = require('../models/index');

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
      // console.log(article);
      if (!article) next({ status: 404 });
      else res.status(200).send({ article });
    })
    .catch(next);
};

exports.deleteArticleById = (req, res, next) => {
  const { article_id } = req.params;
  // console.log(article_id);
  deleteArticle(article_id)
    .then(deleteBlock => res.status(204).send())
    .catch(next);
  // console.log(deletecount);
  // if (!deletecount) next({ status: 404 });
  // else res.status(204).send;
};

exports.patchVotesByArticleId = (req, res, next) => {
  // console.log(req.body);
  // console.log(req.params);

  const { inc_votes } = req.body;
  const { article_id } = req.params;

  // console.log(inc_votes);
  // console.log(article_id);

  return patchVotes(article_id, inc_votes)
    .then(([article]) => {
      // console.log(article);
      if (!article) next({ status: 404 });
      else res.status(200).send(article);
    })
    .catch(next);
};
