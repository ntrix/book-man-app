const shortid = require('shortid')

//const db = require('../shared/db');
//const users = db.get('users').value();
const { User } = require("../shared/db");
const cloudinary = require('cloudinary');

module.exports = {
  
  index: (req, res) => {
    let user = User.findById( req.signedCookies.userId ).value();
    res.render("profile/index", { user: user })
  },
  
  postUpdate: (req, res) => {
    User.findById( req.body.id )
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
    let id = req.signedCookies.userId;
    const errors = res.locals.errors;
    if (errors) {
      res.render("profile/avatar", {
        errors: errors,
        values: req.body,
        users: User.find()
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
    
    cloudinary.uploader.upload(path, function(result, error) {
      if (result) {
        User.find( id ).set('avatarUrl', result.url).write();
        console.log(result.url);
      }
      res.redirect('back');
    });
  },
  
}
