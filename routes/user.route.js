const express = require('express');
const router = express.Router();

const userController = require('../controller/user.controller')
const validate = require('../validate/user.validate');
const authMiddleware = require('../middleware/auth.middleware');

router.use(authMiddleware.requireAuth);

router.post('/add', validate.postAdd, userController.postAdd);

router.get('/', authMiddleware.isAdmin, userController.index);

router.get('/upd/:id', authMiddleware.isAdmin, userController.update);

router.post('/upd',  validate.postAdd, userController.postUpdate);

router.get('/del/:id', authMiddleware.isAdmin, userController.delete);

module.exports = router;