const express = require('express');
const router = express.Router();

const doctorsController = require('../../../controllers/api/v1/doctors');
// registration
router.post('/register', doctorsController.register);
// login
router.post('/login', doctorsController.login);

module.exports = router;