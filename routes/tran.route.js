const express = require("express");
const router = express.Router();
const shortid = require('shortid');

const db = require('../shared/db');
const trans = db.get('trans').value();
const users = db.get('users').value();
const books = db.get('books').value();

router.get('/', (req, res) => {
  res.render("trans/index", { trans: trans });
});

router.get('/create', (req, res) => {
  res.render("trans/create", { users: users, books: books });
});

router.post('/create', (req, res) => {
  //if (req.body.userId.length && req.body.bookId.length){
    req.body.id = shortid.generate();
  console.log(req.body)
    db.get('trans').push(req.body).write();
    res.redirect(req.baseUrl);
  //}
})

module.exports = router;
