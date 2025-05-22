// middleware/authMiddleware.js
module.exports = {
    ensureAuth: (req, res, next) => {
      if (req.session.userId) return next();
      res.redirect('/login');
    },
  };
  