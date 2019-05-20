exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        { 
          username: 'patrick',
          password: 'pass',
          age: 27,
          height: '6foot',
          weight: 185,
          email: 'patrick@gmail.com'
        }
      ]);
    });
};
