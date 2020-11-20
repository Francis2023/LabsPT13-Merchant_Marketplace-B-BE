exports.up = function (knex) {
  return knex.schema.createTable('tags', function (table) {
    table.increments();
    table.string('name').notNullable();
    table.integer('count').notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('tags');
};
