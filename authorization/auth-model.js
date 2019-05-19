const db = require('../data/dbConfig.js');

module.exports = {
    getAll,
    addNew,
    findBy,
    getById,
};

function getAll() {
    return db('users')
};

function findBy(filter) {
    return db('users')
    .where(filter)
    .first()
};

function getById(id) {
    return db('users')
    .where({ id })
    .first()
};

function addNew(user) {
    return db('users')
    .insert(user)
    .then(newUser => {
        return getById(newUser[0])
    });
};