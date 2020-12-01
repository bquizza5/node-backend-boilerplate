const router = require('express').Router();
const bcrypt = require("bcryptjs")
const tasks = require('./tasks-model.js');
const {
  validateCookie
} = require('../api/middleware.js')

router.get('/', (req, res) => {
  tasks.find()
    .then(tasks => {
      res.status(200).json(tasks)
    })
    .catch(err => {
      res.status(500).json({message: 'Error retrieving the tasks.'})
      console.log(err)
    })
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  tasks.findById(id)
    .then(task => {
      res.status(200).json(task)
    })
    .catch(err => {
      res.status(500).json({ message: 'Error retrieving the task.' })
      console.log(err)
    })
})

router.get('/user/:id', (req, res) => {
  const id = req.params.id
  tasks.findAll(id)
    .then(task => {
      res.status(200).json(task)
    })
    .catch(err => {
      res.status(500).json({ message: 'Error retrieving users tasks.' })
      console.log(err)
    })
})

router.post('/', (req, res) => {
  const task = req.body
  tasks.add({...task, completed: 0})
    .then(id => {
      [newtaskId] = id
      return tasks.findById(newtaskId)
    })
    .then(task => {
      res.status(201).json({ message: 'Successfully added the task.', task})
    })
    .catch(err => {
      res.status(500).json({ message: 'Error adding the task.' })
    })
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  tasks.markComplete(id)
    .then(updatedtaskId => {
      return tasks.findById(updatedtaskId)
    })
    .then(updated => {
      res.status(201).json(updated)
    })
    .catch(err => {
      res.status(500).json({ message: err })
    })
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  tasks.remove(id)
    .then(deleted => {
      res.status(200).json({ message: 'Successfully removed the task.' })
    })
    .catch(err => {
      res.status(500).json({ message: 'Error removing the task.' })
    })
})

module.exports = router;