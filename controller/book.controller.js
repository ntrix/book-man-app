const shortid = require('shortid');

const db = require('../shared/db');
const books = db.get('books').value();

module.exports = {
  
  index: (req, res) => {
    const perPage = 10;
    const start = (req.query.page - 1) * perPage;
    res.render("books/index", { books: db.get('books').drop(start).take(perPage).value() });
  },
  
  update: (req, res) => {
    res.render('books/edit', {
      books: books,
      chosenBook: books.find(b => b.id === req.params.id)
    });
  },
  
  postAdd: (req, res) => {
    if (req.body.title.length){
      req.body.id = 'b' + shortid.generate();
      db.get('books').push(req.body).write();
      res.redirect('back');
    }
  },
  
  postUpdate: (req, res) => {
    db.get('books').find({ id: req.body.id })
      .assign(req.body)
      .write();
    res.redirect(req.baseUrl);
  },
  
  delete: (req, res) => {
    db.get('books').remove({ id: req.params.id }).write();
    res.redirect(req.baseUrl);
  }
  
}
