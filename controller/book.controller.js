const shortid = require('shortid');

const db = require('../shared/db');
const books = db.get('books').value();

module.exports = {
  
  index: (req, res) => {
    const page = req.query.page;
    const perPage = 16;
    const start = (page - 1) * perPage;
    res.render("books/index", { books: books.slice(start, start + perPage) });
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
