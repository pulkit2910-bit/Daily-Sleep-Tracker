// EXPRESS
const express = require('express');
const app = express();
app.use(express.urlencoded())
app.use(express.static("public"));

// EJS
app.set('view engine', 'ejs');

// Morgan
var morgan = require('morgan')
app.use(morgan('combined'))

// URL
const {URLSearchParams} = require('url')

// Routes 
const login = require('./Routes/login.js');
const signup = require('./Routes/signup.js');
const user = require('./Routes/user.js');

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

// PORT
app.listen(3000, () => {
    console.log("Server started at port 3000");
})