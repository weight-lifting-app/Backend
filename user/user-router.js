const router = require('express').Router();

//Set DB, Import restrict-need token middleware.
const db = require('./user-model.js');
const restrict = require('../authorization/authorize-middleware.js');






module.exports = router;