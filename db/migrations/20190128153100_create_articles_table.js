exports.up = function (connection, Promise) {
  return connection.schema.createTable('articles', (articlesTable) => {
    articlesTable.increments('article_id').primary();
    articlesTable.string('title').notNullable();
    articlesTable.text('body').notNullable();
    articlesTable.integer('votes').defaultTo('0');
    articlesTable
      .string('topic')
      .references('slug')
      .inTable('topics')
      .notNullable();
    articlesTable
      .string('username')
      .references('username')
      .inTable('users')
      .notNullable();
    articlesTable.timestamp('created_at').defaultTo(connection.fn.now());
  });
};

exports.down = function (connection, Promise) {
  return connection.schema.dropTable('articles');
};
