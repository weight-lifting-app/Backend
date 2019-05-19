const router = require('express').Router();

//Set DB, Import restrict-need token middleware.
const db = require('./exercises-model.js');
const restrict = require('../authorization/authorize-middleware.js');

//Get Exercises.
router.get('/', restrict, (req, res) => {
    db.getAll()
    .then(exercises => {
        res.status(200).json(exercises)
    })
    .catch(err => {
        res.status(500).json(err.message)
    })
});

module.exports = router;