const apiRouter = require('express').Router();

const topicsRouter = require('../routes/topics');

const articlesRouter = require('../routes/articles');

const usersRouter = require('../routes/users');

const { serveJSON } = require('../controllers/api');
const { handle405 } = require('../error/index');

apiRouter.use('/topics', topicsRouter);
apiRouter.use('/articles', articlesRouter);
apiRouter.use('/users', usersRouter);

apiRouter.get('/', serveJSON);
apiRouter.all('/', handle405);

module.exports = apiRouter;
