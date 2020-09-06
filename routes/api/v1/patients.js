const express = require('express');
const router = express.Router();
const passport = require('passport');
const patientsController = require('../../../controllers/api/v1/patients');

router.post('/register', passport.authenticate('jwt', {session: false}), patientsController.register);
router.post('/:id/create-report', passport.authenticate('jwt', {session: false}), patientsController.createReport);

module.exports = router;