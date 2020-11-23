const router = require('express').Router();
const bcrypt = require("bcryptjs")
const users = require('./users-model.js');
const {
  validateUserId,
  validatePostReqBody,
  validateCookie
} = require('../api/middleware.js')

router.get('/', (req, res) => {
  users.find()
    .then(users => {
      res.status(200).json(users)
    })
    .catch(err => {
      res.status(500).json({message: 'Error retrieving the users.'})
      console.log(err)
    })
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  users.findById(id)
    .then(user => {
      res.status(200).json(user)
    })
    .catch(err => {
      res.status(500).json({ message: 'Error retrieving the user.' })
      console.log(err)
    })
})

router.post('/', (req, res) => {
  const user = req.body
  user.password = bcrypt.hashSync("password", 12)
  users.add(user)
    .then(id => {
      console.log(id)
      [newuserId] = id
      return users.findById(newuserId)
    })
    .then(user => {
      res.status(201).json({ message: 'Successfully added the user.', user})
    })
    .catch(err => {
      res.status(500).json({ message: err })
    })
})

router.put('/:id', (req, res) => {
  const id = req.params.id
  const updated = req.body
  users.edit(id, updated)
    .then(updateduserId => {
      return users.findById(updateduserId)
    })
    .then(updated => {
      res.status(201).json(updated)
    })
    .catch(err => {
      res.status(500).json({ message: 'Error updating the user.' })
    })
})

router.delete('/:id', (req, res) => {
  const id = req.params.id
  users.remove(id)
    .then(deleted => {
      res.status(200).json({ message: 'Successfully removed the user.' })
    })
    .catch(err => {
      res.status(500).json({ message: 'Error removing the user.' })
    })
})

module.exports = router;


/*
        _=====_                               _=====_
       / _____ \                             / _____ \
     +.-'_____'-.---------------------------.-'_____'-.+
    /   |     |  '.        S O N Y        .'  |  _  |   \
   / ___| /|\ |___ \                     / ___| /_\ |___ \
  / |      |      | ;  __           _   ; | _         _ | ;
  | | <---   ---> | | |__|         |_:> | ||_|       (_)| |
  | |___   |   ___| ;SELECT       START ; |___       ___| ;
  |\    | \|/ |    /  _     ___      _   \    | (X) |    /|
  | \   |_____|  .','" "', |___|  ,'" "', '.  |_____|  .' |
  |  '-.______.-' /       \ANALOG/       \  '-._____.-'   |
  |               |       |------|       |                |
  |              /\       /      \       /\               |
  |             /  '.___.'        '.___.'  \              |
  |            /                            \             |
   \          /                              \           /
    \________/                                \_________/
*/