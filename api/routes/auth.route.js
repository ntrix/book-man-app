const express = require('express');
const router = express.Router();

const authController = require('../controller/auth.controller');
const validate = require('../../validate/auth.validate');

router.post('/', validate.postLogin, authController.postLogin);

module.exports = router;