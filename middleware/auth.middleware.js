module.exports = {
  requireAuth: (req, res, next) => {
    if (!req.signedCookies.userId) {
      res.cookie('path', req.baseUrl, { signed: true });
      res.redirect('/auth/login');
      return;
    }
    next();
  },
  
  isAdmin: (req, res, next) => {
    if (req.signedCookies.isAdmin)
      next();
  }
  
}