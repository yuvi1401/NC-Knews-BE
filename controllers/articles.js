const { fetchArticles, fetchArticleById, deleteArticle } = require('../models/index');

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
  return deleteArticle('article_id', article_id)
    .then((deletecount) => {
      if (!deletecount) next({ status: 404 });
      else res.status(204).send({ message: 'deleted successfuly' });
    })
    .catch(next);
};
