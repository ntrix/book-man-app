require('dotenv').config();
const shortid = require('shortid')
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);
const sgMail = require('@sendgrid/mail');

const db = require('../shared/db');
const users = db.get('users').value();

module.exports.login = (req, res) => {
  res.render("auth/login");
}

module.exports.postLogin = async (req, res, next) => {
  const errors = res.locals.errors;
  const email = req.body.email;
  const password = req.body.password;
  //const hash = bcrypt.hashSync(req.body.password, salt);
  
  const foundUser = db.get('users').find({ email: email });
  const user = foundUser.value();
  
  if (user.wrongLoginCount == 4)
    errors.push("Too many fail attempts! Please try again in 24 hours or reset your password.");
  else if (!user)
    errors.push("User does not exist!")
  else if (password && !bcrypt.compareSync(password, user.password)) {
    foundUser.set('wrongLoginCount', (user.wrongLoginCount || 0) + 1).write();
    errors.push("Wrong password! " + user.wrongLoginCount + " of 4 attempts.");
    
    if (user.wrongLoginCount >= 3) {
      
      try {
        console.log(process.env.SENDGRID_API_KEY)
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        await sgMail.send({
          to: email,
          from: 'LibApp@whitehouse.org',
          subject: 'Warning too many failed attempts by logging in',
          text: 'You have reached ' + user.wrongLoginCount + ' of 4 attempts to login. Please be careful or your account will be locked for 24 hours.',
          html: '<strong>You can also reset your password</strong>',
        });
      } catch (error) {
      console.log(error);
    }
      errors.push("A warning message has been sent to this email address!");
    }
  }

  if (errors.length) {
    res.render("auth/login", { errors: errors, values: req.body });
    return;
  }
  //user.wrongLoginCount = 0;
  foundUser.set('wrongLoginCount', 0).write();
  
  res.cookie('userId', user.id, { signed: true });
  res.cookie('isAdmin', user.isAdmin || 0, { signed: true });
  res.redirect('/trans');
}

