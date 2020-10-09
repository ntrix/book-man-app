const shortid = require('shortid');

//const db = require('../shared/db');
//const books = db.get('books').value();
const { Book } = require("../shared/db");

module.exports = {
  
  index: async (req, res) => {
    const books = await Book.find();

    const page = +req.query.page || 1;
    const perPage = 10;
    const maxPage = Math.ceil(books.length / perPage);
    const start = (page - 1) * perPage;
    const pageArray = [
      { val: page > 5? page - 5: page > 2? 1: 0, label: '«' },
      { val: page > 1? page - 1: 0},
      { val: page, label: '[ ' + page + ' ]' },
      { val: page < maxPage? page + 1: 0},
      { val: page < maxPage - 5? page + 5: page < maxPage - 2? maxPage: 0, label: '»' }
    ];
    
    res.render("books/index", {
      books: books.slice(start, start + perPage),
      pages: pageArray
    });
  },
  
  update: async (req, res) => {
    const books = await Book.find();
    res.render('books/edit', {
      books: books,
      chosenBook: Book.findById( req.params.id )
    });
  },
  
  postAdd: (req, res) => {
    if (req.body.title.length){
      //req.body.id = 'b' + shortid.generate();
      Book.insert(req.body);
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
