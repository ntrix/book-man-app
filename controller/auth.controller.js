const shortid = require('shortid')
const db = require('../shared/db');
const auth = db.get('auth').value();


module.exports = {
  
  index: (req, res) => {
    res.render("auth/index", { auth: auth })
  },
  
  update: (req, res) => {
    res.render('auth/edit', {
      auth: auth,
      chosenUser: auth.find(u => u.id === req.params.id)
    });
  },
  
  postLogin: (req, res) => {
    const errors = res.locals.errors;
    if (errors.length) {
      res.render("auth/index", {
        errors: errors,
        values: req.body,
        auth: auth
      });
      return;
    }
    req.body.id = 'u' + shortid.generate();
    db.get('auth').push(req.body).write();
    res.redirect('back');
  }
  
}