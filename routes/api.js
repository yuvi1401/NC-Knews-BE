const apiRouter = require('express').Router();

const topicsRouter = require('../routes/topics');

const articlesRouter = require('../routes/articles');

const usersRouter = require('../routes/users');

apiRouter.use('/topics', topicsRouter);
apiRouter.use('/articles', articlesRouter);
apiRouter.use('/users', usersRouter);

module.exports = apiRouter;
