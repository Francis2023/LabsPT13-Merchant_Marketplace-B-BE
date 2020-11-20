exports.up = function (knex) {
  return knex.schema.createTable('products-tags', function (table) {
    table
      .integer('product_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('products')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    table
      .integer('tag_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('tags');

    table.primary(['product_id', 'tag_id']);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('products-tags');
};
