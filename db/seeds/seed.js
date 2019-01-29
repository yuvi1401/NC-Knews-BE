const {
  topicData, userData, articleData, commentData,
} = require('../data');
const { createRef, formatDate } = require('../../utils');

// First Stage - insert topic data
// Second stage - users data
// Third stage - format articles data...as created_by related to username
// Next Stage--insert article data

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
  );

  // const topicRef = createRef(topicRows, 'slug', 'description');

  // .then((houseRows) => {
  //   // <-- do rest of the seed logic here ...
  // });
};
