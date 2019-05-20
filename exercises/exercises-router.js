const router = require('express').Router();

//Set DB, Import restrict-need token middleware.
const db = require('./exercises-model.js');
const restrict = require('../authorization/authorize-middleware.js');

//Get Exercises.
router.get('/', (req, res) => {
    db.getAll()
    .then(exercises => {
        res.status(200).json(exercises)
    })
    .catch(err => {
        res.status(500).json(err.message)
    })
});

//Get Exercise by ID.
router.get('/:id', (req, res) => {
    const id = req.params.id;

    db.getById(id)
    .then(exercise => {
        if(exercise) {
            res.status(200).json(exercise)
        } else {
            res.status(400).json({ message: "The specified exercise does not exist."})
        }
    })
    .catch(err => {
        res.status(500).json(err.message)
    })
});

//Post Exercise.
router.post('/', (req, res) => {
    const newExercise = req.body;

    if(!newExercise.name) {
        res.status(400).json({ message: "Please provide a name for this exercise."})
    } else {
        db.addNew(newExercise)
        .then(exercise => {
            res.status(201).json(exercise)
        })
        .catch(err => {
            res.status(500).json(err.message)
        })
    };
});

//Delete Exercise.
router.delete('/:id', (req, res) => {
    const id = req.params.id;

    db.remove(id)
    .then(count => {
        res.status(200).json({ message: "Exercise successfully deleted."})
    })
    .catch(err => {
        res.status(500).json(err.message)
    })
});

//Update Exercise.
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body;

    db.update(id, changes)
    .then(changes => {
        if(changes) {
            res.status(200).json({ message: "Exercise successfully updated."})
        } else {
            res.status(404).json({ message: "The specified exercise does not exist."})
        }
    })
    .catch(err => {
        res.status(500).json(err.message)
    })
});

module.exports = router;