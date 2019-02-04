const usersRouter = require('express').Router();

const { getAllUsers, postUser } = require('../controllers/users');
const { handle405 } = require('../error/index');

usersRouter
  .route('/')
  .get(getAllUsers)
  .post(postUser)
  .all(handle405);

// usersRouter.get('/', getAllUsers);
// usersRouter.post('/', postUser);

module.exports = usersRouter;
