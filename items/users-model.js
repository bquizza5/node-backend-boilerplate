const db = require('../database/db-config.js');

module.exports = {
  find,
  findById,
  findByUsername,
  add,
  edit,
  remove
}

function find() {
  return db('users')
}

function findById(id) {
  console.log("Hit findById")
  return db('users').where('id', id).first()
}

function findByUsername(username) {
  return db('users').where('username', username).first()
}

function add(user) {
  return db('users').insert(user)
}

function edit(id, user) {
  return db('users').update(user).where('id', id)
}

function remove(id) {
  return db('users').del().where('id', id)
}