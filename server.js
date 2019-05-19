const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

//Set Server
const server = express();

// Import Routers/Helpers
const authRouter = require('./authorization/auth-router.js');
const exercisesRouter = require('./exercises/exercises-router.js');

// Server Use
server.use(helmet());
server.use(express.json());
server.use(cors());

// Set Routers
server.use('/api/auth', authRouter);
server.use('/api/exercises', exercisesRouter);

//Server Test Msg
server.get('/', (req, res) => {
    res.status(200).send({ message: 'Hello from LambdaFit.'})
});

module.exports = server;