
<<<<<<< HEAD

=======
>>>>>>> 77695ae07c4af9bf10dad4ee770b65e612b11794
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('reviews')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('reviews').insert([
        {
<<<<<<< HEAD
          profile_id: 'pv2864sfheem5j4o2vhs',
          product_id: 2,
          rate: 2,
          description: 'The product was not good',
        },
        {
          profile_id: 'pv2864sfheem5j4o2vhs',
          product_id: 1,
          rate: 1,
          description: 'It sucks',
        },
        {
          profile_id: 'pv2864sfheem5j4o2vhs',
          product_id: 4,
          rate: 4,
          description: 'Very good product',
        },
      ]);
    });
};
=======
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
>>>>>>> 77695ae07c4af9bf10dad4ee770b65e612b11794
