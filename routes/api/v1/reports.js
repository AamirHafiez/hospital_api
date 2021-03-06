const express = require('express');
const router = express.Router();
const passport = require('passport');

const reportsController = require('../../../controllers/api/v1/reports');

// all reports of all patients filtered
router.get('/:status', passport.authenticate('jwt', {session: false}), reportsController.filterAllReports);

module.exports = router;