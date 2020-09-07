const express = require('express');
const router = express.Router();

// doctors 
router.use('/doctors', require('./doctors'));
// patients
router.use('/patients', require('./patients'));
// reports
router.use('/reports', require('./reports'));

module.exports = router;