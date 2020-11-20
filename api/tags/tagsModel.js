const db = require('../../data/db-config');
const {findBy} = require('../globalDbModels')

const TABLE_NAME = 'tags';


const create = async (tags, product_id) => {
  tags.forEach(tag => {
    let exists = await findBy(TABLE_NAME, {name: tag});

    if (exists) {
      return db('tags').update({count: exists.count + 1}).where({id: exists.id});
    } else {
      let tag_id = await db('tags').insert({name: tag, count: 1}).returning('*');
      return db('products-tags').insert({product_id, tag_id})
    }
  });

};

module.exports = { create };
