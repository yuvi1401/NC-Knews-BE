const apiRouter = require('express').Router();

const usersRouter = require('../routes/users');

apiRouter.use('/users', usersRouter);

module.exports = apiRouter;
