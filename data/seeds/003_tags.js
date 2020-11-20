exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('tags')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('tags').insert([
        { name: 'history', count: 1 },
        { name: 'electronics', count: 2 },
        { name: 'cars', count: 1 },
        { name: 'bikes', count: 3 },
        { name: 'hiking', count: 1 },
      ]);
    });
};
