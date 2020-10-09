const shortid = require('shortid');

//const db = require('../shared/db');
//const books = db.get('books').value();
const { Book } = require("../shared/db");

module.exports = {
  
  index: async (req, res) => {
    const books = await Book.find();

    const page = +req.query.page || 1;
    const perPage = 10;
    const maxPage = books.length / perPage | 0;
    const start = (page - 1) * perPage;
    const pageArray = [
      { val: page > 5? page - 5: page > 2? 1: 0, label: '«' },
      { val: page > 1? page - 1: 0},
      { val: page, label: '[ ' + page + ' ]' },
      { val: page < maxPage? page + 1: 0},
      { val: page < maxPage - 5? page + 5: page < maxPage - 2? maxPage: 0, label: '»' }
    ];
    
    console.log(books);
    res.render("books/index", {
      books: books.skip(start),//Book.drop(start).take(perPage).value(),
      pages: []//pageArray
    });
  },
  
  update: async (req, res) => {
    const books = await Book.find();
    res.render('books/edit', {
      books: books,
      chosenBook: books.find(b => b.id === req.params.id)
    });
  },
  
  postAdd: (req, res) => {
    if (req.body.title.length){
      req.body.id = 'b' + shortid.generate();
      Book.push(req.body).write();
      res.redirect('back');
    }
  },
  
  postUpdate: (req, res) => {
    Book.findById( req.body.id )
      .assign(req.body)
      .write();
    res.redirect(req.baseUrl);
  },
  
  delete: (req, res) => {
    Book.remove({ id: req.params.id }).write();
    res.redirect(req.baseUrl);
  }
  
}
