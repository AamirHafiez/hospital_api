const express = require('express');
const router = express.Router();

// url: api/v1
router.use('/v1', require('./v1'));

module.exports = router;