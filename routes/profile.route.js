const express = require('express');
const router = express.Router();
const multer = require('multer');
var upload = multer({ dest: './public/uploads/' })

const profileController = require('../controller/profile.controller')
const validate = require('../validate/user.validate');

const authMiddleware = require('../middleware/auth.middleware');

router.use(authMiddleware.requireAuth);

router.get('/', profileController.index);

router.post('/', upload.none('avatar'), validate.postAdd, profileController.postUpdate);

router.get('/avatar', profileController.avatar);

router.post('/avatar', upload.single('avatar'), validate.postAdd, profileController.postAvatar);

module.exports = router;