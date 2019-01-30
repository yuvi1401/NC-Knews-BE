const usersRouter = require('express').Router();
const { getUsers } = require('../controllers/users');

usersRouter.get('/users', getUsers);

module.exports = usersRouter;
