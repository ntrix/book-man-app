const { User, Book, Tran } = require("../../shared/db");

module.exports = {

  index: async (req, res) => {
    const id = req.body.userId;
    const isAdmin = +req.body.isAdmin || 0;
    
    let trans = await (isAdmin || !id? Tran.find(): Tran.find( {userId: id} )) || [];
    let books = await Book.find();
    let users = await User.find();
    
    books = books.reduce( (acc, b) => Object.assign(acc, {[b._id]: b.title}), {});
    users = users.reduce( (acc, u) => Object.assign(acc, {[u._id]: u.username}), {});
    
    trans = trans.map(t => ({
      id: t._id,
      title: books[t.bookId],
      username: users[t.userId],
      isComplete: t.isComplete
    }) );
    
    res.json({ trans: trans, isAdmin: isAdmin});
  },
  /*
  create: async (req, res) => {
    let users = await User.find();
    let books = await Book.find();
    res.render("trans/create", { users: users, books: books });
  },
  
  postCreate: async (req, res) => {
    const tran = new Tran({
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
    
    matchedTran.isComplete = true;
    matchedTran.save( function(err, data) {
      if (err) console.log(err);
      else res.redirect('back');
    })
  }
  */
}
