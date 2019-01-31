const connection = require('../db/connection');

exports.fetchTopics = () => connection('topics').select('*');
// exports.getAllusers = (username) => {return connection('users').select('*');}
exports.addTopic = newTopic => connection('topics')
  .insert(newTopic)
  .returning('*');

exports.fetchArticlesByTopic = (topic, limit = 10, sort_by = 'created_at', p = 1, order = 'desc') => connection('articles')
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
