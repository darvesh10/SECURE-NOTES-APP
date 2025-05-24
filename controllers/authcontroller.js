// controllers/authController.js
const User = require('../models/User');

// Show register page
exports.showRegister = (req, res) => {
  res.render('auth/register');
};

// Show login page
exports.showLogin = (req, res) => {
  res.render('auth/login');
};

// Register new user
// Register new user
exports.registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      req.flash('error_msg', 'Username already taken.');
      return res.redirect('/register'); // redirect instead of send
    }

    const newUser = new User({ username, password });
    await newUser.save();

    req.flash('success_msg', 'Registered successfully! Please log in.');
    res.redirect('/login'); // redirect to login page with success message
  } catch (err) {
    console.log(err);
    req.flash('error_msg', 'Error during registration. Try again.');
    res.redirect('/register');
  }
};


// Login user
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  console.log("Login attempt:", username, password); // 👈 Add this

  try {
    const user = await User.findOne({ username });

    if (!user) {
      console.log("User not found");
      return res.send('Invalid credentials');
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      console.log("Password mismatch");
      return res.send('Invalid credentials');
    }

    req.session.userId = user._id;
    console.log("Login successful"); 
    res.redirect('/notes/dashboard');
  } catch (err) {
    console.error(err);
    res.send('Error during login');
  }
};


// Logout user
exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
};
