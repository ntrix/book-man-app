const shortid = require('shortid')

const db = require('../shared/db');
const users = db.get('users').value();
const cloudinary = require('cloudinary');

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
    const errors = res.locals.errors;
    if (errors) {
      res.render("profile/avatar", {
        errors: errors,
        values: req.body,
        users: users
      });
      return;
    }
    
    /*_________Upload avatar file to CD______________*/
    let path = req.file.path;
    
    cloudinary.config({
      cloud_name: process.env.CD_NAME,
      api_key: process.env.CD_API_KEY,
      api_secret: process.env.CD_API_SECRET
    });
    
    cloudinary.uploader.upload(avatarUrl, function(result, error) {
      if (result) {
        var id = req.params.id
        User.findOneAndUpdate({ _id: id }, { avatar: result.url }, {upsert: true}, function(err, doc) {
          if (err) console.log(err)
        });
      }
      res.redirect("/users/update/" + req.params.id);
    });

    db.get('users').find({ id: req.signedCookies.userId }).value();//avatarUrl
    //req.body.id = 'u' + shortid.generate();
    db.get('users').push(req.body).write();
    res.redirect('back');
  },
  
}
