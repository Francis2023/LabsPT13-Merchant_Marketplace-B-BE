exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('tags')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('tags').insert([
        { name: 'electronics', count: 1 },
        { name: 'computers', count: 2 },
        { name: 'sports', count: 1 },
      ]);
    });
};
