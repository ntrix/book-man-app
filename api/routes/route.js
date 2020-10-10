const express = require('express');
const router = express.Router();

const validate = require('../../validate/auth.validate');
const tranController = require('../controller/tran.controller');
const authController = require('../controller/auth.controller');

router.get('/transactions', tranController.index);

/*router.get('/create', tranController.create);

router.post('/create', tranController.postCreate);

router.get('/:id/complete', tranController.complete);*/

router.post('/login', /*validate.postLogin,*/ authController.postLogin);

module.exports = router;