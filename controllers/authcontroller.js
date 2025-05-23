const user = require("../models/user");

//show register page
exports.showRegister = (req, res) => {
  res.render("auth/register");
};

//show login page
exports.showLogin = (req, res) => {
  res.render("auth/login");
};

//register new user
exports.registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await user.findOne({ username });
    if (existingUser) {
      return res.send("user already exists");
    }

    const newUser = new user({ username, password });
    await newUser.save();
    req.session.userId = newUser._id;
    res.redirect("/notes/dashboard");
  } catch (err) {
    console.log(err);
    res.send("error during registration");
  }
};

//login  user
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  console.log('Login attempt for:', username); // Debug
  
  try {
    const foundUser = await user.findOne({ username });
    console.log('User found:', foundUser ? foundUser.username : 'None'); // Debug
    
    if (!foundUser) {
      console.log('User not found');
      return res.render("auth/login", { 
        error: "Invalid username or password",
        username 
      });
    }

    console.log('Comparing password...'); // Debug
    const isMatch = await foundUser.matchPassword(password);
    if (!isMatch) {
      console.log('Password mismatch');
      return res.render("auth/login", { 
        error: "Invalid username or password",
        username 
      });
    }

    // Save session and THEN redirect
    req.session.userId = foundUser._id;
    req.session.username = foundUser.username;
    
    // Save session before redirect
    req.session.save(err => {
      if (err) {
        console.log('Session save error:', err);
        return res.render("auth/login", { 
          error: "Login failed",
          username 
        });
      }
      console.log('Session saved, redirecting...');
      res.redirect("/notes/dashboard");
    });
    
  } catch (err) {
    console.error('Login error:', err);
    res.render("auth/login", {
      error: "Login failed. Please try again.",
      username
    });
  }
};
//logout user
exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};
