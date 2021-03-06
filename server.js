const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

//Set Server
const server = express();

// Import Routers/Helpers
const authRouter = require('./authorization/auth-router.js');
const exercisesRouter = require('./exercises/exercises-router.js');
const userRouter = require('./user/user-router.js');

// Server Use
server.use(helmet());
server.use(express.json());
server.use(cors());

// Set Routers
server.use('/auth', authRouter);
server.use('/exercises', exercisesRouter);
server.use('/user', userRouter);

//Server Test Msg
server.get('/', (req, res) => {
    res.status(200).send({ message: 'Hello from LambdaFit.'})
});

module.exports = server;