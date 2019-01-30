const { fetchTopics, addTopic } = require('../models/index');

// const connection = require('../db/connection');

exports.getAllTopics = (req, res, next) => fetchTopics()
  .then((topics) => {
    res.status(200).json({ topics });
  })
  .catch(next);

// exports.postTopic = (req, res, next) => {
//   connection('topics')
//     .insert(req.body)
//     .returning('*')
//     .then(([topic]) => {
//       res.status(201).send({ topic });
//     })
//     .catch(next);
// };

exports.postTopic = (req, res, next) => {
  addTopic(req.body)
    .then(([topic]) => {
      res.status(201).send({ topic });
    })
    .catch(next);
};
