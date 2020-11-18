exports.up = function (knex) {
  return knex.schema.createTable('products', function (table) {
    table.string('id').notNullable().unique().primary();
    table
      .integer('profile_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('products')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');

    table.string('title');
    table.string('description');
    table.string('category');
    table.string('brand');
    table.string('condition');
    table.string('delivery_method');
    table.timestamps('created_at', { useTz: true });
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('products');
};
