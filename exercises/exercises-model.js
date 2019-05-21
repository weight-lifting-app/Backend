const db = require("../data/dbConfig.js");

module.exports = {
  getAll,
  getById,
  addNew,
  remove,
  update
};

function getAll() {
  return db("exercises")
    .leftJoin("users", "exercises.user_id", "users.id")
    .select({
      name: "exercises.name",
      username: "users.username",
      user_id: "exercises.user_id",
      body_region: "exercises.body_region",
      amount_lifted: "exercises.amount_lifted",
      reps: "exercises.reps",
      sets: "exercises.sets",
      date: "exercises.date",
      id: "exercises.id"
    });
}

function getById(id) {
  return db("exercises")
    .where({ id })
    .first();
}

function addNew(exercise) {
  return db("exercises")
    .insert(exercise)
    .returning("id")
    .then(id => {
      return getById(id[0]);
    });
}

function remove(id) {
  return db("exercises")
    .where({ id })
    .first()
    .del();
}

function update(id, changes) {
  return db("exercises")
    .where({ id })
    .update(changes)
    .then(count => {
      if (count > 0) {
        return getById(id);
      } else {
        return null;
      }
    });
}
