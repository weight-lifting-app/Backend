const db = require('../data/dbConfig.js');

module.exports = {
    getAll,
    getById,
    
}

function getAll() {
    return db('exercises')
};

function getById(id) {
    return db('exercises')
    .where({ id })
    .first()
};