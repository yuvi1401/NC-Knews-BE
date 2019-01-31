const topicsRouter = require('express').Router();

const { getAllTopics, postTopic, getArticlesByTopic } = require('../controllers/topics');

topicsRouter.get('/', getAllTopics);

topicsRouter.get('/:topic/articles', getArticlesByTopic);

topicsRouter.post('/', postTopic);

module.exports = topicsRouter;
