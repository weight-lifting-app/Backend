const db = require('../data/dbConfig.js');

module.exports = {
    getAll,
    getById,
    addNew,
    remove,
    update
};

function getAll() {
    return db('exercises')
};

function getById(id) {
    return db('exercises')
    .where({ id })
    .first()
};

function addNew(exercise) {
    return db('exercises')
    .insert(exercise)
    .returning('id')
    .then(id => {
        return getById(id[0])
    })
};

function remove(id) {
    return db('exercises')
    .where({ id })
    .first()
    .del()
};

function update(id, changes) {
    return db('exercises')
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