const express = require("express");
const dotenv = require("dotenv");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const path = require("path");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 3000;
const authRoutes = require('./routes/authroutes');
const notesRoutes = require('./routes/noteroutes');

dotenv.config();
const app = express();
connectDB();

//middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

//session
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'fallback-secret-key',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ 
      mongoUrl: process.env.MONGODB_URI,
      ttl: 24 * 60 * 60 // 1 day
    }),
    cookie: {
      maxAge: 24 * 60 * 60 * 1000,
      httpOnly: true
    }
  })
);

// VIEW ENGINE
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//routes
app.use('/', authRoutes);
app.use('/notes', notesRoutes);

// Add these before app.listen()

// Debug route to check session
app.get('/debug-session', (req, res) => {
  console.log('Current session:', req.session);
  res.json({
    session: req.session,
    cookies: req.headers.cookie || 'No cookies found'
  });
});

// Test route to manually set session
app.get('/force-login', (req, res) => {
  req.session.userId = 'test123';
  req.session.username = 'testuser';
  res.redirect('/notes/dashboard');
});

app.listen(PORT, () => {
  console.log(`server is runing on ${PORT}`);
});
