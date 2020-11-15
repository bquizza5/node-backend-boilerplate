
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {first_name: "testAdmin", last_name: "test", username: "testAdmin", password: "$2a$12$qn7pk5wEwIQ6B1HsfAxH/.XJtw.CWyKurpl01Liz5KLM4YPyYOPyC", position: "manager"},
        {first_name: "testUser", last_name: "test", username: "testUser", password: "$2a$12$qn7pk5wEwIQ6B1HsfAxH/.XJtw.CWyKurpl01Liz5KLM4YPyYOPyC", position: "employee"}
      ]);
    });
};
