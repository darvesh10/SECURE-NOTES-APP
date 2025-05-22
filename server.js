const express = require("express");
const dotenv = require("dotenv");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const path = require("path");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 3000;
const authRoutes = require('./routes/authroutes');

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
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB_URI }),
  })
);

// VIEW ENGINE
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

//routes
app.use('/', authRoutes);

app.listen(PORT, () => {
  console.log(`server is runing on ${PORT}`);
});
