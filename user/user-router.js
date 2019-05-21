const router = require('express').Router();

//Set DB, Import restrict-need token middleware.
const db = require('./user-model.js');
const restrict = require('../authorization/authorize-middleware.js');

//Get Users
router.get('/', (req, res) => {
    db.getUsers()
    .then(users => {
        res.status(200).json(users)
    })
    .catch(err => {
        res.status(500).json(err.message)
    })
})

//Get User by ID
router.get('/:id', (req, res) => {
    const id = req.params.id;
    
    db.getById(id)
    .then(user => {
        if(user) {
            res.status(200).json(user)
        } else {
            res.status(400).json({ message: "The specified user does not exist."})
        }
    })
    .catch(err => {
        res.status(500).json(err.message)
    })
});

//Update User Info.
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;

    db.update(id, changes)
    .then(changes => {
        if(changes) {
            res.status(200).json({ message: "User successfully updated."})
        } else {
            res.status(404).json({ message: "The specified user does not exist."})
        }
    })
    .catch(err => {
        res.status(500).json(err.message)
    })
});



module.exports = router;