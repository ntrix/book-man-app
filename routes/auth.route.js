const express = require('express');
const router = express.Router();

const authController = require('../controller/auth.controller')
const authAPIController = require('../controller/auth.api.controller')
const validate = require('../validate/auth.validate');

router.post('/login', validate.postLogin, authController.postLogin);

router.post('/api/login', validate.postLogin, authAPIController.postLogin);

router.get('/login', authController.login);

module.exports = router;