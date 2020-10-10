const shortid = require('shortid');

//const db = require('../shared/db');
//const users = db.get('users').value();
//const books = db.get('books').value();
const { User, Book, Tran } = require("../shared/db");

module.exports = {

  index: async (req, res) => {
    const id = req.signedCookies.userId;
    const isAdmin = +req.signedCookies.isAdmin;
    
    let trans = await (isAdmin? Tran.find(): Tran.findById( id ));
    
    let transList = trans.map(async t => ({
      id: t._id,
      title: await Book.findById( t.bookId ).title,
      username: await User.findById( t.userId ).username,
      isComplete: t.isComplete
    }) );
    console.log(transList);
    res.render("trans/index", { trans: transList, isAdmin: isAdmin});
  },
  
  create: async (req, res) => {
    let users = await User.find();
    let books = await Book.find();
    res.render("trans/create", { users: users, books: books });
  },
  
  postCreate: async (req, res) => {
    const tran = new Book({
      userId: req.body.userId,
      bookId: req.body.bookId
    });
    
    tran.save( function(err, data) {
      if (err) console.log(err);
      else res.redirect(req.baseUrl);
    })
  },
  
  complete: async (req, res) => {
    const matchedTran = await Tran.findById( req.params.id );
    if (!matchedTran) res.send('Transaction(id) does not exist');
    
    matchedTran.set('isComplete', true).write();
    res.redirect('back');
  }
}
