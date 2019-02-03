const usersRouter = require('express').Router();

const { getAllUsers, postUser } = require('../controllers/users');

usersRouter.get('/', getAllUsers);
usersRouter.post('/', postUser);

module.exports = usersRouter;
