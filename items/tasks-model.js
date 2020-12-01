const db = require('../database/db-config.js');

module.exports = {
  find,
  findAll,
  findById,
  add,
  edit,
  remove,
  markComplete
}

function find() {
  return db('tasks')
}

function findAll(id) {
  return db('tasks').where('user_id', id)
}

function findById(id) {
  return db('tasks').where('id', id).first()
}

function add(task) {
  return db('tasks').insert(task)
}

function edit(id, task) {
  return db('tasks').update(task).where('id', id)
}

function markComplete(id) {
  return db('tasks').update({'completed': 1}).where('id', id)
}

function remove(id) {
  return db('tasks').del().where('id', id)
}