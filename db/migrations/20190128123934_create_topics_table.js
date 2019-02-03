exports.up = function (connection, Promise) {
  // do the update, create topic table
  return connection.schema.createTable('topics', (topicsTable) => {
    topicsTable
      .string('slug')
      .primary()
      .notNullable();
    topicsTable.string('description').notNullable();
  });
};

exports.down = function (connection, Promise) {
  // console.log('removing topic tables...');
  return connection.schema.dropTable('topics');
};
