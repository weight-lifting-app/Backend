exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("exercises")
    .truncate()
    .then(function() {
      // Inserts seed entries
      return knex("exercises").insert([
        {
          name: "Bench-Press",
          user_id: 1,
          body_region: "Chest",
          amount_lifted: "185",
          reps: "8",
          date: "2/7/2019"
        },

        {
          name: "Dumbbell Bench-Press",
          user_id: 1,
          body_region: "Chest",
          amount_lifted: "50",
          reps: "8",
          date: "2/7/2019"
        }
      ]);
    });
};
