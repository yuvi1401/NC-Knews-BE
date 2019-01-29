const {
  topicData, userData, articleData, commentData,
} = require('../data');
const { createRefArticlesData, formatDate } = require('../../utils');

// First Stage - insert topic data
// Second stage - users data
// Third stage - format articles data...as created_by related to username
// Next Stage--insert article data
// Assign reference for title and article_id (article table)by creating reference object
// Format comments Table name as per scema table..change created by, created at and replace unwanted data

exports.seed = function (knex, Promise) {
  return (
    knex.migrate
      .rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex('topics')
        .insert(topicData)
        .returning('*'))
      .then(() => knex('users')
        .insert(userData)
        .returning('*'))
      // //need to format article use map for each element(here its object) as given in note
      // exports.formatWizards = (wizardData, houseRef) => {
      // return wizardData.map((wizard) => {
      //     const { house, ...restOfWizard } = wizard;
      //     return {
      //       house_id: houseRef[house],
      //       ...restOfWizard,
      //     };
      //     );
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
        // console.log(articleRef);
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
      })
  );

  // const topicRef = createRef(topicRows, 'slug', 'description');

  // .then((houseRows) => {
  //   // <-- do rest of the seed logic here ...
  // });
};
