exports.up = function (connection, Promise) {
  return connection.schema.createTable('articles', (articlesTable) => {
    articlesTable.increments('article_id').primary();
    articlesTable.string('title');
    articlesTable.text('body').notNullable();
    articlesTable.integer('votes').defaultTo('0');
    articlesTable
      .string('topic')
      .references('slug')
      .inTable('topics');
    articlesTable
      .string('username')
      .references('username')
      .inTable('users');
    articlesTable.timestamp('created_at').defaultTo(connection.fn.now(6));
  });
};

exports.down = function (connection, Promise) {
  return connection.schema.dropTable('articles');
};
