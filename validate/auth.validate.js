module.exports = {
  
  postLogin: (req, res, next) => {
    res.locals = { errors: [] };
    console.log(req.body);
    if (!req.body.email.length) 
      res.locals.errors.push('Email is required');
    
    if (req.body.email.length > 30)
      res.locals.errors.push('Email is too long');
    
    if (!req.body.password.length) 
      res.locals.errors.push('Password is required');
    
    if (req.body.password.length > 30)
      res.locals.errors.push('Password is too long'); 

    next();
  }
}