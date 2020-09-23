const express = require('express');
const router = express.Router();
const userController = require('../controller/user.controller')

const validate = require('../validate/user.validate');

router.post('/add', validate.postAdd, userController.postAdd);

router.get('/', userController.index);

router.get('/upd/:id', userController.update);

router.post('/upd', userController.postUpdate);

router.get('/del/:id', userController.delete);

module.exports = router;