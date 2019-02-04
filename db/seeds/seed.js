const {
  topicData, userData, articleData, commentData,
} = require('../data');
const { createRefArticlesData, formatDataOfArticles, formatCommentsData } = require('../../utils');

exports.seed = function (knex, Promise) {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => knex('topics')
      .insert(topicData)
      .returning('*'))
    .then(() => knex('users')
      .insert(userData)
      .returning('*'))
    .then(() => knex('articles')
      .insert(formatDataOfArticles)
      .returning('*'))
    .then(articletable => knex('comments')
      .insert(formatCommentsData(commentData, createRefArticlesData(articletable)))
      .returning('*'));
};
