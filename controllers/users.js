const { getAllusers } = require('../models/index.js');

exports.getUsers = (req, res, next) => {
  const { username } = req.params;

  return getAllusers().then((users) => {
    res.status(200).json({
      users,
    });
  });
};
