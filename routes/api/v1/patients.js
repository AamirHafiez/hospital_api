const express = require('express');
const router = express.Router();
const passport = require('passport');
const patientsController = require('../../../controllers/api/v1/patients');

// patient registration
router.post('/register', passport.authenticate('jwt', {session: false}), patientsController.register);
// patient report creation
router.post('/:id/create-report', passport.authenticate('jwt', {session: false}), patientsController.createReport);
// all reports of a particular patient according to date created (ascending)
router.get('/:id/all-reports', passport.authenticate('jwt', {session: false}), patientsController.showAllReports);

module.exports = router;