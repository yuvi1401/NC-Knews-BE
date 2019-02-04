const {
  topicData, userData, articleData, commentData,
} = require('../db/data');

const createRefArticlesData = Data => Data.reduce((articleObj, articleCurr) => {
  articleObj[articleCurr.title] = articleCurr.article_id;
  return articleObj;
}, {});

const formatDataOfArticles = articleData.map(({ created_by, created_at, ...restOfArticle }) => ({
  username: created_by,
  created_at: new Date(created_at),
  ...restOfArticle,
}));

const formatCommentsData = (commentData, createRefArticlesData) => {
  const formatCommentsData = commentData.map(
    ({
      created_at, created_by, belongs_to, ...restOfArticle
    }) => ({
      username: created_by,
      created_at: new Date(created_at),
      article_id: createRefArticlesData[belongs_to],
      ...restOfArticle,
    }),
  );
  return formatCommentsData;
};
module.exports = { formatDataOfArticles, createRefArticlesData, formatCommentsData };
