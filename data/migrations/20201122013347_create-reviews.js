const { table } = require("../db-config");

exports.up = function(knex) {
  return knex.schema.createTable('reviews', function(table) {
      table.increments();
      table
        .integer('product_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('products')
        .onDelete('CASCADE')
        .onUpdate('CASCADE')
      table
        .string('profile_id')
        .notNullable()
        .references('id')
        .inTable('profiles')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
      table.integer('rate').notNullable();
      table.string('description');
      table.timestamps(true, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('reviews')
};
