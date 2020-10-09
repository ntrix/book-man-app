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
  
  postAdd: (req, res) => {
    if (req.body.title.length){
      const book = new Book({
        title: req.body.title,
        description: req.body.description
      });

      book.save( function(err, data) {
        if (err) console.log(err);
        else res.redirect('back');//done(null, data);
      })
    }
  },
  
  update: async (req, res) => {
    const books = await Book.find();
    const chosenBook = books.find(b => b._id == req.params.id );
    
    res.render('books/edit', {
      books: books,
      chosenBook: chosenBook
    });
  },
  
  postUpdate: (req, res) => {
    const {id, title, description} = req.body;
    Book.findByIdAndUpdate( id, { title: title, description: description }, { new: true }, function(err, data) {
      if (err) console.log(err);
      else res.redirect(req.baseUrl);
    })
  },
  
  delete: (req, res) => {
    Book.findByIdAndRemove( req.params.id, function(err, data) {
      if (err) console.log(err);
      else res.redirect(req.baseUrl);
    });
  }
}
