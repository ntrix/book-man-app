const { User } = require("../shared/db");
const cloudinary = require('cloudinary');

module.exports = {
  
  index: async (req, res) => {
    let user = await User.findById( req.signedCookies.userId );
    res.render("profile/index", { user: user })
  },
  
  postUpdate: async (req, res) => {
    let user = await User.findById( req.body.id );
    user.username = req.body.username;
    user.email = req.body.email;
    user.save( err => err? console.log(err) :res.redirect(req.baseUrl));
  },
  
  
  avatar: async (req, res) => {
    let user = await User.findById( req.signedCookies.userId );
    res.render('profile/avatar', {
      user: user
    });
  },
  
  postAvatar: async (req, res) => {
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
