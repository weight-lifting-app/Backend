// Set Router. Import bcrypt/jwt libraries.
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Bring in model and JWT secret
const db = require('./auth-model.js');
const secrets = require('./secrets.js');




// Generate Token
function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username,
    };

    const options = {
        expiresIn: '12h',
    };

    return jwt.sign(payload, secrets.jwtSecret, options)
};

module.exports = router;