const connection = require('../db/connection');

exports.fetchTopics = () => connection('topics').select('*');
// exports.getAllusers = (username) => {return connection('users').select('*');}
exports.addTopic = newTopic => connection('topics')
  .insert(newTopic)
  .returning('*');

exports.fetchArticlesByTopic = (topic, limit, sort_by, p, order) => connection('articles')
  .select(
    'articles.article_id',
    'articles.username as author',
    'articles.title',
    'articles.votes as votes',
    'articles.created_at',
    'articles.topic',
  )
  .where(topic)
  .leftJoin('comments', 'comments.article_id', '=', 'articles.article_id')
  .groupBy('articles.article_id')
  .count({ comment_count: 'comments.comment_id' })
  .limit(limit)
  .orderBy(sort_by, order)
  .offset((p - 1) * limit);

exports.addArticleByTopic = newArticle => connection('articles')
  .insert(newArticle)
  .returning('*');

exports.fetchArticles = (limit, sort_by, p, order) => connection('articles')
  .select(
    'articles.article_id',
    'articles.username as author',
    'articles.title',
    'articles.votes as votes',
    'articles.created_at',
    'articles.topic',
    'articles.body',
  )
  .leftJoin('comments', 'comments.article_id', '=', 'articles.article_id')
  .groupBy('articles.article_id')
  .count({ comment_count: 'comments.comment_id' })
  .limit(limit)
  .orderBy(sort_by, order)
  .offset((p - 1) * limit)
  .returning('*');

exports.fetchArticleById = id => connection('articles')
  .select(
    'articles.article_id',
    'articles.username as author',
    'articles.title',
    'articles.body',
    'articles.votes as votes',
    'articles.created_at',
    'articles.topic',
  )
  .where(id)
  .leftJoin('comments', 'comments.article_id', '=', 'articles.article_id')
  .groupBy('articles.article_id')
  .count({ comment_count: 'comments.comment_id' });

// exports.deleteArticle = id => connection('articles')
//   .where(id)
//   .delete();

// exports.deleteArticle = (str, id) => connection('articles')
//   .where(str, id)
//   .delete();

exports.deleteArticle = article_id => connection('articles')
  .where({ article_id })
  .del();

exports.patchVotes = (article_id, inc_votes) => connection('articles')
  .where('articles.article_id', '=', article_id)
  .increment('votes', inc_votes)
  .returning('*');
