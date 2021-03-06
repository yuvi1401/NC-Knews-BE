const {
  fetchTopics,
  addTopic,
  fetchArticlesByTopic,
  addArticleByTopic,
} = require('../models/topics');

exports.getAllTopics = (req, res, next) => fetchTopics()
  .then((topics) => {
    res.status(200).send({ topics });
  })
  .catch(next);

exports.postTopic = (req, res, next) => {
  addTopic(req.body)
    .then(([topic]) => {
      res.status(201).send({ topic });
    })
    .catch(next);
};

exports.getArticlesByTopic = (req, res, next) => {
  const {
    limit = 10, sort_by = 'created_at', p = 1, order = 'desc',
  } = req.query;

  const sortOrder = ['username', 'title', 'votes', 'created_at', 'topic', 'count'];
  const sort_by_selection = sortOrder.includes(sort_by) ? sort_by : 'created_at';
  const orderSelection = order === 'asc' ? 'asc' : 'desc';

  return fetchArticlesByTopic(req.params, limit, sort_by_selection, p, orderSelection)
    .then((articles) => {
      if (articles.length === 0) next({ status: 404 });
      else res.status(200).send({ articles });
    })
    .catch(next);
};

exports.postArticleByTopic = (req, res, next) => {
  const { body } = req;
  body.topic = req.params.topic;
  return addArticleByTopic(body)
    .then(([article]) => {
      res.status(201).send({ article });
    })
    .catch(next);
};
