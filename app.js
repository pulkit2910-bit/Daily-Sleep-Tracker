// require('dotenv/config')
const { verify } = require('jsonwebtoken');
const { hash, compare } = require('bcryptjs');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// EXPRESS
const express = require('express');
const app = express();
app.use(express.urlencoded())
app.use(express.static("public"));
app.use(cookieParser());

app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true
    })
);

// EJS
app.set('view engine', 'ejs');

// URL
const {URLSearchParams} = require('url')

// Routes 
const login = require('./Routes/login.js');
const signup = require('./Routes/signup.js');
const user = require('./Routes/user.js');
const admin = require('./Routes/admin.js');

// Mongoose connect and model
const UserData = require('./models/db.js');

// LOGIN/SIGNUP 
// GET REQUESTS
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/Login/index.html");
})

// POST REQUESTS
app.post("/signup-route", (req, res) => {
    res.redirect("/signup");
})

// LOGIN ROUTE
app.use(login);

// SIGNUP ROUTE
app.use(signup);

// USER INTERFACE(HOME)
app.use(user);

// ADMIN PANEL
app.use(admin);

// PORT
app.listen(3000, () => {
    console.log("Server started at port 3000");
})