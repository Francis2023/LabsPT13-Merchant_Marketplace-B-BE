const db = require('../../data/db-config');
const { findBy } = require('../globalDbModels');

const TABLE_NAME = 'tags';

const create = (tags, product_id) => {
  tags.forEach(async (tag) => {
    let exists = await findBy(TABLE_NAME, { name: tag });

    if (exists) {
      await db('tags')
        .update({ count: exists.count + 1 })
        .where({ id: exists.id });
    } else {
      let inserted = await db('tags')
        .insert({ name: tag, count: 1 })
        .returning('*');
      exists = await findBy(TABLE_NAME, { id: inserted[0].id });
    }

    return db('products-tags').insert({ product_id, tag_id: exists.id });
  });
};

module.exports = { create };
