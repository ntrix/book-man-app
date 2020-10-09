const shortid = require('shortid');

//const db = require('../shared/db');
//const users = db.get('users').value();
//const books = db.get('books').value();
const { User, Book, Tran } = require("../shared/db");

module.exports = {

  index: (req, res) => {
    const id = req.signedCookies.userId;
    const isAdmin = +req.signedCookies.isAdmin;
    console.log(typeof id, typeof isAdmin);
    
    let trans;
    if (isAdmin)
       trans = Tran.find();
    else
      trans = Tran.find( id );
    
    let transList = trans.map(t => ({
      _id: t._id,
      title: Book.findById( t.bookId ).value().title,
      username: User.findById( t.userId ).value().username,
      isComplete: t.isComplete
    }) );
    res.render("trans/index", { trans: transList, isAdmin: isAdmin});
  },
  
  create: (req, res) => {
    let users = User.find();
    let books = Book.find();
    res.render("trans/create", { users: users, books: books });
  },
  
  complete: (req, res) => {
    const matchedTran = Tran.findById( req.params.id );
    if (!matchedTran.value()) res.send('Transaction(id) does not exist'); // or render error page
    
    matchedTran.set('isComplete', true).write();
    res.redirect('back');
  },
  
  postCreate: (req, res) => {
    //req.body.id = 't' + shortid.generate();
    Tran.push(req.body).write();
    res.redirect(req.baseUrl);
  }
}
