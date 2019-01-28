exports.up = function (connection, Promise) {
  return connection.schema.createTable('articles', (articlesTable) => {
    articlesTable.increments('article_id').primary();
    articlesTable.string('title');
    articlesTable.string('body');
    articlesTable.integer('votes').defaultTo('0');
    articlesTable
      .string('topic')
      .references('slug')
      .inTable('topics');
    articlesTable
      .string('username')
      .references('username')
      .inTable('users');
    articlesTable.datetime('created_at', 13).defaultTo(connection.fn.now(13));
  });
};

exports.down = function (connection, Promise) {
  return connection.schema.dropTable('articles');
};
