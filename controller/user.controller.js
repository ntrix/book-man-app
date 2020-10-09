const shortid = require('shortid')

//const db = require('../shared/db');
//const users = db.get('users').value();
const { User } = require("../shared/db");

module.exports = {
  
  index: (req, res) => {
    let users = User.find();
    res.render("users/index", { users: users})
  },
  
  update: (req, res) => {
    res.render('users/edit', {
      users: User.find(),
      chosenUser: User.findById(req.params.id)
    });
  },
  
  postAdd: (req, res) => {
    const errors = res.locals.errors;
    if (errors.length) {
      res.render("users/index", {
        errors: errors,
        values: req.body,
        users: User.find()
      });
      return;
    }
    //req.body.id = 'u' + shortid.generate();
    User.push(req.body).write();
    res.redirect('back');
  },
  
  postUpdate: (req, res) => {
    User.findById( req.body.id )
      .assign(req.body)
      .write();
    res.redirect(req.baseUrl);
  },
  
  delete: (req, res) => {
    User.remove({ id: req.params.id }).write();
    res.redirect(req.baseUrl);
  }
  
}
