const connection = require('../db/connection');

exports.fetchTopics = () => connection('topics').select('*');
// exports.getAllusers = (username) => {return connection('users').select('*');}
exports.addTopic = newTopic => connection('topics')
  .insert(newTopic)
  .returning('*');
