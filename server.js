const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

//Set Server
const server = express();

// Import Routers/Helpers
// const authRouter = require('');

// Server Use
server.use(helmet());
server.use(express.json());
server.use(cors());

// Set Routers
// server.use('/api/auth', authRouter);

//Server Test Msg
server.get('/', (req, res) => {
    res.status(200).send({ message: 'Hello from LambdaFit.'})
});

module.exports = server;