const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const session = require('express-session')

//IMPORTED ROUTES HERE
const usersRouter = require('../items/users-router.js')
const tasksRouter = require('../items/tasks-router.js')
const loginRouter = require('../items/login-router.js')


const server = express();

const sessionConfig = {
    name: 'monkey',
    secret: "this is the secret",
    cookie: {
        maxAge: 1000 * 60 * 10,
        secure: false,
        httpOnly: true,
    },
    resave: false,
    saveUninitialized: true,
}

server.use(cors());
server.use(helmet());
server.use(express.json());
server.use(session(sessionConfig))

//USE ROUTES HERE
server.use('/api/users', usersRouter)
server.use('/api/tasks', tasksRouter)
server.use('/api/login', loginRouter)


module.exports = server;