
exports.up = function(knex) {
  return knex.schema
    .createTable('users', user => {
      user.increments();
      user
        .string("username")
        .notNullable()
        .unique()
        user
        .string("password")
        .notNullable()
      user
        .string('first_name', 255)
        .notNullable()
      user
        .string('last_name', 255)
        .notNullable()
      user
        .text('position').notNullable();
    })
    .createTable('tasks', task => {
      task.increments();
      task
        .string('name')
        .notNullable()
      task
        .string('description')
        .notNullable()
      task
        .integer('completed')
        .notNullable()
      task
        .integer('user_id')
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
    })
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('tasks')
    .dropTableIfExists('users')
};