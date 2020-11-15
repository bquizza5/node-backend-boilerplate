const db = require('../database/db-config.js');
const Users = require('../items/users-model.js');
const Tasks = require('../items/tasks-model.js');

module.exports = {
  validateUserId,
  validateTaskId,
  validatePostReqBody,
  validateCookie
}

function validateCookie(req, res, next) {
  if (req.session && req.session.user) {
    next()
  } else {
    res.status(401).json({ message: 'you shall not pass!' })
  }
}

function validateUserId(req, res, next) {
  Users.findById(req.params.id)
    .then(response => {
      if (response) {
        res.id = response
        next()
      } else {
        res.status(404).json({ message: 'No user found with that ID.' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Error finding the user ID.' })
    })
}

function validateTaskId(req, res, next) {
  Tasks.findById(req.params.id)
    .then(response => {
      if (response) {
        res.id = response
        next()
      } else {
        res.status(404).json({ message: 'No task found with that ID.' })
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Error finding the task ID.' })
    })
}

function validatePostReqBody(req, res, next) {
  // if (req.body.name) {
  //   if (req.body.description) {
  //     if (req.body.category) {
  //       next()
  //     } else {
  //       res.status(404).json({ message: 'Category field is required.'})
  //     }
  //   } else {
  //     res.status(404).json({ message: 'Description field is required.'})
  //   }
  // } else {
  //   res.status(404).json({ message: 'Name field is required.'})
  // }
  next()
}