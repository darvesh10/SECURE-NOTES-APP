// middleware/authMiddleware.js
module.exports = {
  ensureAuth: (req, res, next) => {
    console.log('Middleware session check:', req.session); // Debug
    if (req.session.userId) {
      return next();
    }
    res.redirect('/login');
  },
};