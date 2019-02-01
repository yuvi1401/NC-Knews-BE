const apiRouter = require('express').Router();

const topicsRouter = require('../routes/topics');
// const usersRouter = require('../routes/users');
const articlesRouter = require('../routes/articles');
// apiRouter.use('/users', usersRouter);
apiRouter.use('/topics', topicsRouter);
apiRouter.use('/articles', articlesRouter);
module.exports = apiRouter;
