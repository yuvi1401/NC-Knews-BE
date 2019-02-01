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
      .inTable('articles')
      .onDelete('CASCADE');
    commentsTable.integer('votes').defaultTo('0');
    commentsTable.timestamp('created_at').defaultTo(connection.fn.now(6));
    commentsTable.text('body').notNullable();
  });
};

exports.down = function (connection, Promise) {
  return connection.schema.dropTable('comments');
};
