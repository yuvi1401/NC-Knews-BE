const apiRouter = require('express').Router();

const topicsRouter = require('../routes/topics');
// const usersRouter = require('../routes/users');

// apiRouter.use('/users', usersRouter);
apiRouter.use('/topics', topicsRouter);
module.exports = apiRouter;
