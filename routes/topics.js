const topicsRouter = require('express').Router();

const {
  getAllTopics,
  postTopic,
  getArticlesByTopic,
  postArticleByTopic,
} = require('../controllers/topics');

topicsRouter.get('/', getAllTopics);

topicsRouter.get('/:topic/articles', getArticlesByTopic);
topicsRouter.post('/:topic/articles', postArticleByTopic);

topicsRouter.post('/', postTopic);

module.exports = topicsRouter;
