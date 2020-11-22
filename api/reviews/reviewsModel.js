const db = require('../../data/db-config');

const findBy = (filter) => {
    return db('reviews').where(filter);
};

module.exports = {
    findBy,
}