const shortid = require('shortid');

const db = require('../shared/db');
const books = db.get('books').value();

module.exports = {
  
  index: (req, res) => {
    const page = +req.query.page;
    const perPage = 10;
    const maxPage = books.length / perPage | 0;
    const start = (- 1) * perPage;
    const pageArray = [
      page > 5? page - 5: page > 2? 1: 0,
      page > 1? page - 1: 0,
      page,
      page < maxPage - 1? page + 1: 0,
      page < maxPage - 5? page + 5: page < maxPage - 2? maxPage: 0
    ];
    res.render("books/index", {
      books: db.get('books').drop(start).take(perPage).value(),
      pages: pageArray
    });
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
