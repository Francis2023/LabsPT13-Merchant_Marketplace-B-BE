const db = require('../../data/db-config');

const create = (tag) => {
  return db('tags').insert(tag).returning('*');
};

module.exports = { create };
