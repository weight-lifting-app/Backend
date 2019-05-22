const db = require("../data/dbConfig.js");

module.exports = {
  getUsers,
  getById,
  update,
  getUserExercises
};

function getUsers() {
  return db("users");
}

function getById(id) {
  return db("users")
    .where({ id })
    .first();
}

function getUserExercises(userId) {
  return db("exercises as e")
    .join("users as u", "u.id", "e.user_id")
    .select(
      "u.username",
      "e.id",
      "e.name",
      "e.body_region",
      "e.amount_lifted",
      "e.reps",
      "e.sets",
      "e.date"
    )
    .where("e.user_id", userId);
}

function update(id, changes) {
  return db("users")
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
