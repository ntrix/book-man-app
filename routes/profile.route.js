const express = require('express');
const router = express.Router();

const profileController = require('../controller/profile.controller')
const validate = require('../validate/user.validate');

router.post('/', validate.postAdd, profileController.postUpdate);

router.get('/', profileController.index);

router.get('/avatar', profileController.avatar);

router.post('/avatar', validate.postAdd, profileController.postAvatar);

module.exports = router;