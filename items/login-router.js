const router = require('express').Router();
const bcrypt = require("bcryptjs")
const users = require('./users-model.js');
const {
  validateUserId,
  validatePostReqBody,
  validateCookie
} = require('../api/middleware.js')


router.post('/', (req, res) => {
  const user = req.body
  users.findByUsername(user.username)
  .then( user => {
    if(user && bcrypt.compareSync(req.body.password, user.password)) {
      req.session.user = user
      res.status(200).json({ message: `welcome ${user.username}`})
    } else {
      res.status(401).json({ message: "invalid credentials"})
    }
  })
  .catch( error => {
    res.status(500).json({message: "there was an error", error: error})
  })

})

router.post('/updatePassword', (req, res) => {
  let newUser = {...req.session.user, password: bcrypt.hashSync(req.body.password, 12)}
  users.edit(req.session.user.id, newUser)
  .then( user => {
    res.status(200).json({ message: `password updated`})
  })
  .catch( error => {
    res.status(500).json({message: "there was an error", error: error})
  })

})

module.exports = router;