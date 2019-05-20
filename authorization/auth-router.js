// Set Router. Import bcrypt/jwt libraries.
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Bring in model and JWT secret
const db = require('./auth-model.js');
const secrets = require('./secrets.js');

//Register User
router.post('/register', (req, res) => {
    const user = req.body;
    const hash = bcrypt.hashSync(user.password, 12); //hash password
    user.password = hash;

    if(!user.username && !user.password ) {
        res.status(401).json({ message: "Please provide a username and password for this user."})
    } else {
        db.addNew(user)
        .then(registered => {
            const token = generateToken(registered)
            res.status(201).json({registered, token})
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    };
});

//Login User
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    db.findBy({ username })
    .first()
    .then(user => {
        if(user && bcrypt.compareSync(password, user.password)) {
            const token = generateToken(user); //create token
            res.status(200).json({
                message: `Welcome, ${user.username}, enjoy LambdaFit.`,
                token,
            })
        } else {
            res.status(401).json({ message: "Please provide valid credentials."})
        }
    })
    .catch(err => {
        res.status(500).json(err.message)
    })
});

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