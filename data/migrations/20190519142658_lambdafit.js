exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', tbl => {
    tbl.increments();

    tbl
    .string('username', 128)
    .notNullable()
    .unique();

    tbl
    .string('password', 128)
    .notNullable();

    tbl.integer('age');
    tbl.integer('weight');
    tbl.string('height', 128);
    tbl.string('email', 128);
  })
  .createTable('exercises', tbl => {
    tbl.increments();

    tbl.string('name', 128).notNullable();

    //foreign key linking exercises to users.
    tbl
    .integer('user_id')
    .unsigned()
    .notNullable()
    .references('id')
    .inTable('users')
    .onDelete('CASCADE')
    .onUpdate('CASCADE')

    tbl.string('body_region', 128).notNullable()

    tbl.string('amount_lifted', 128).notNullable()

    tbl.string('reps', 128)
    tbl.string('date', 128).notNullable()
  })
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('users')
    .dropTableIfExists('exercises')
};
