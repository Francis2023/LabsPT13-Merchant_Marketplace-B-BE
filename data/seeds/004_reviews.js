
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('reviews')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('reviews').insert([
        {
          product_id:1, 
          profile_id: '00ulthapbErVUwVJy4x6',
          rate: 3,
          description: 'The product was good',
        },
        {
          product_id:2, 
          profile_id: '00ulthapbErVUwVJy4x6',
          rate: 1,
          description: 'The product was bad',
        },
        {
          product_id:3, 
          profile_id: '00ulthapbErVUwVJy4x6',
          rate: 4,
          description: 'very good product',
        }
      ]);
    });
};
