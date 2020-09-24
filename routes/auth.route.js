const express = require('express');
const router = express.Router();

const authController = require('../controller/auth.controller')
const validate = require('../validate/auth.validate');

router.post('/login', validate.postLogin, authController.postLogin);

router.get('/login', authController.login);

module.exports = router;