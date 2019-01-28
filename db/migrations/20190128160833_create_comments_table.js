exports.up = function (connection, Promise) {
  return connection.schema.createTable('comments', (commentsTable) => {
    commentsTable.increments('comment_id').primary();
    commentsTable
      .string('username')
      .references('username')
      .inTable('users');
    commentsTable
      .integer('article_id')
      .references('article_id')
      .inTable('articles');
    commentsTable.integer('votes').defaultTo('0');
    commentsTable.datetime('created_at', 13).defaultTo(connection.fn.now(13));
    commentsTable.string('body');
  });
};

exports.down = function (connection, Promise) {
  return connection.schema.dropTable('comments');
};
