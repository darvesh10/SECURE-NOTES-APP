// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const {
  showRegister,
  showLogin,
  registerUser,
  loginUser,
  logoutUser,
} = require('../controllers/authController');

router.get('/register', showRegister);
router.post('/register', registerUser);

router.get('/login', showLogin);
router.post('/login', loginUser);

router.get('/logout', logoutUser);

module.exports = router;
