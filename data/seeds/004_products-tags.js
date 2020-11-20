exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('products-tags')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('products-tags').insert([
        { product_id: 1, tag_id: 1 },
        { product_id: 2, tag_id: 2 },
        { product_id: 3, tag_id: 2 },
        { product_id: 3, tag_id: 3 },
      ]);
    });
};
