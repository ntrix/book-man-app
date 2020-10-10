const { User } = require("../shared/db");

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
    user.save( err => err? console.log(err) :0);
    res.redirect('back');
  },
  
  update: async (req, res) => {
    const users = await User.find();
    res.render('users/edit', {
      users: users,
      chosenUser: users.find(u => u._id == req.params.id)
    });
  },
  
  postUpdate: async (req, res) => {
    let user = User.findById( req.body.id );
    user = req.body;
      .assign(req.body)
      .write();
    res.redirect(req.baseUrl);
  },
  
  delete: async (req, res) => {
    User.remove({ id: req.params.id }).write();
    res.redirect(req.baseUrl);
  }
  
}
