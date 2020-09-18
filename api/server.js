const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authenticate = require('../auth/authenticate-middleware.js');
const authRouter = require('../auth/auth-router.js');
const jokesRouter = require('../jokes/jokes-router.js');

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

// to test if the API is up and running
server.get('/', (req, res) =>{
    res.status(200).send(`<h1> Server is up and running </h1>`)
})

server.use('/api/auth', authRouter);
server.use('/api/jokes', authenticate, jokesRouter);


module.exports = server;
