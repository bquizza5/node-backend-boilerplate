
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tasks').del()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        {name: "task1", description: "task1 description", user_id: 1},
        {name: "task2", description: "task2 description", user_id: 2}
      ]);
    });
};
