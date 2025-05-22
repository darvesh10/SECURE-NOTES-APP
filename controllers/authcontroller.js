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
  try {
    const user = await user.findOne({ username });
    if (!user || !(await user.matchPassword(password))) {
      return res.send("invalid credentials");
    }
    req.session.userId = user._id;
    res.redirect("/notes/dashboard");
  } catch (err) {
    console.log(err);
    res.send("error during login");
  }
};

//logout user
exports.logoutUser = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};
