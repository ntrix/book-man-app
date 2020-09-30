const shortid = require('shortid')

const db = require('../shared/db');
const users = db.get('users').value();


module.exports = {
  
  index: (req, res) => {
    var user )
    res.render("profile/index", { user: user })
  },
  
  postUpdate: (req, res) => {
    db.get('users').find({ id: req.body.id })
      .assign(req.body)
      .write();
    res.redirect(req.baseUrl);
  },
  
  
  avatar: (req, res) => {
    res.render('profile/avatar', {
      users: users,
      chosenUser: users.find(u => u.id === req.params.id)
    });
  },
  
  postAvatar: (req, res) => {
    const errors = res.locals.errors;
    if (errors.length) {
      res.render("profile/avatar", {
        errors: errors,
        values: req.body,
        users: users
      });
      return;
    }
    req.body.id = 'u' + shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect('back');
  },
  
}
