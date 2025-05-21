const express = require("express");
const dotenv = require("dotenv");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const path = require('path');
const connectDB = require('./config/db');

dotenv.config();
const app = express();
connectDB();

//middleware
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('public'));

//session
app.use(
    session({
        secret: process.env
    })
)