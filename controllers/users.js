const { fetchAllUsers, addUser } = require('../models/users');

exports.getAllUsers = (req, res, next) => fetchAllUsers()
  .then((users) => {
    res.status(200).send({
      users,
    });
  })
  .catch(next);

exports.postUser = (req, res, next) => {
  addUser(req.body)
    .then(([user]) => {
      res.status(201).send({ user });
    })
    .catch(next);
};
