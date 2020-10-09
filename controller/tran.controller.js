const shortid = require('shortid');

//const db = require('../shared/db');
//const users = db.get('users').value();
//const books = db.get('books').value();
const { User, Book } = require("../shared/db");

module.exports = {

  index: (req, res) => {
    const id = req.signedCookies.userId;
    const isAdmin = +req.signedCookies.isAdmin;
    console.log(typeof id, typeof isAdmin);
    let trans = db.get('trans').value();
    
    if (!isAdmin)
      trans = trans.filter(t => t.userId === id );
    
    let transList = trans.map(t => ({
      id: t.id,
      title: db.get('books').find({ id: t.bookId }).value().title,
      username: db.get('users').find({ id: t.userId }).value().username,
      isComplete: t.isComplete
    }) );
    res.render("trans/index", { trans: transList, isAdmin: isAdmin});
  },
  
  create: (req, res) => {
    res.render("trans/create", { users: users, books: books });
  },
  
  complete: (req, res) => {
    const matchedTran = db.get('trans').find({ id: req.params.id });
    if (!matchedTran.value()) res.send('Transaction(id) does not exist'); // or render error page
    
    matchedTran.set('isComplete', true).write();
    res.redirect('back');
  },
  
  postCreate: (req, res) => {
    req.body.id = 't' + shortid.generate();
    db.get('trans').push(req.body).write();
    res.redirect(req.baseUrl);
  }
}
