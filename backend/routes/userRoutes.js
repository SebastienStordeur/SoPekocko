const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const pswChecking = require('../middleware/passwordChecking');

router.post('/signup', pswChecking, userController.signup);
router.post('/login', userController.login);

module.exports = router;