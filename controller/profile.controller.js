const shortid = require('shortid')

const db = require('../shared/db');
const users = db.get('users').value();
const cloudinary = require('cloudinary').v2;

module.exports = {
  
  index: (req, res) => {
    let user = db.get('users').find({ id: req.signedCookies.userId }).value();
    res.render("profile/index", { user: user })
  },
  
  postUpdate: (req, res) => {
    db.get('users').find({ id: req.body.id })
      .assign(req.body)
      .write();
    res.redirect(req.baseUrl);
  },
  
  
  avatar: (req, res) => {
    let user = { id: req.signedCookies.userId };
    res.render('profile/avatar', {
      user: user
    });
  },
  
  postAvatar: (req, res) => {
    let user = { id: req.signedCookies.userId };
    const errors = res.locals.errors;
    console.log(req.file);
    if (errors) {
      res.render("profile/avatar", {
        errors: errors,
        values: req.body,
        users: users
      });
      return;
    }
    db.get('users').find({ id: req.signedCookies.userId }).value();//avatarUrl
    //req.body.id = 'u' + shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect('back');
  },
  
}
