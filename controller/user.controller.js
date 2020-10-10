const { User } = require("../shared/db");
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

module.exports = {
  
  index: async (req, res) => {
    const users = await User.find();
    res.render("users/index", { users: users })
  },
  
  postAdd: async (req, res) => {
    const errors = res.locals.errors;
    const users = await User.find();
    if (errors.length) {
      res.render("users/index", {
        errors: errors,
        values: req.body,
        users: users
      });
      return;
    }
    let user = new User({
      username: req.body.username,
      email: req.body.email,
      password: "123123"
    });
    user.save( err => err? console.log(err) :res.redirect('back') );
    
  },
  
  update: async (req, res) => {
    const users = await User.find();
    res.render('users/edit', {
      users: users,
      chosenUser: users.find(u => u._id == req.params.id)
    });
  },
  
  postUpdate: async (req, res) => {
    let user = await User.findById( req.body.id );
    user.username = req.body.username;
    user.email = req.body.email;
    user.save( err => err? console.log(err) :res.redirect(req.baseUrl));
  },
  
  delete: async (req, res) => {
    User.findByIdAndRemove(req.params.id, err =>
      err? console.log(err) :res.redirect(req.baseUrl)
    );
  }
}
