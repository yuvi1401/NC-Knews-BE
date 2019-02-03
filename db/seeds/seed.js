const {
  topicData, userData, articleData, commentData,
} = require('../data');
const { createRefArticlesData, formatDate } = require('../../utils');

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
    .then(() => {
      const formatDataOfArticles = articleData.map(
        ({ created_by, created_at, ...restOfArticle }) => ({
          username: created_by,
          created_at: formatDate(created_at),
          ...restOfArticle,
        }),
      );

      return knex('articles')
        .insert(formatDataOfArticles)
        .returning('*');
    })
    .then((articletable) => {
      const articleRef = createRefArticlesData(articletable, 'title', 'article_id');
      const formatCommentsData = commentData.map(
        ({
          created_at, created_by, belongs_to, ...restOfArticle
        }) => ({
          username: created_by,
          created_at: formatDate(created_at),
          article_id: articleRef[belongs_to],
          ...restOfArticle,
        }),
      );
      return knex('comments')
        .insert(formatCommentsData)
        .returning('*');
    });
};
