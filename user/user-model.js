const db = require('../data/dbConfig.js');

module.exports = {
    getById,
    update,
};

function getById(id) {
    return db('users')
    .where({ id })
    .first()
};

function update(id, changes) {
    return db('users')
    .where({ id })
    .update(changes)
    .then(count => {
        if(count > 0) {
            return getById(id)
        } else {
            return null
        }
    })
};