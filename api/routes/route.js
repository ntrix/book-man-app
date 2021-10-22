const express = require('express');
const router = express.Router();

const validate = require('../../validate/auth.validate');
const authController = require('../controller/auth.controller');
const tranController = require('../controller/tran.controller');
const bookController = require('../controller/book.controller');

router.get('/books', bookController.getAll);

router.get('/:quantity/books', bookController.getQuantity);

router.post('/login', /*validate.postLogin,*/ authController.postLogin);

router.get('/transactions', tranController.index);

router.post('/transactions/create', tranController.postCreate);

router.get('/transactions/:id/complete', tranController.complete);

module.exports = router;