const express = require('express');
const { userInfo } = require('os');
const router = express.Router();

console.log('Router is loaded!!');

// url: /api
router.use('/api', require('./api'));

module.exports = router;