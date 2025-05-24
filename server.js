const express = require("express");
const dotenv = require("dotenv");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const path = require("path");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 3000;
const authRoutes = require('./routes/authroutes.js');
const notesRoutes = require('./routes/noteroutes.js');
const flash = require('connect-flash');

dotenv.config();
const app = express();
connectDB();

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(flash());

//session
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI
  }),
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));
// Global variables for EJS
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  next();
});

// VIEW ENGINE
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//routes
app.use('/', authRoutes);
app.use('/notes', notesRoutes);

app.get('/check', (req, res) => {
  if (req.session.userId) {
    res.send("You are logged in");
  } else {
    res.send("You are NOT logged in");
  }
});

app.listen(PORT, () => {
  console.log(`server is runing on ${PORT}`);
});
