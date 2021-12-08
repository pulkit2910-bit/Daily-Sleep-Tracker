// EXPRESS
const express = require('express');
const app = express();
app.use(express.urlencoded())
app.use(express.static("public"));
app.set('view engine', 'ejs');

const {URLSearchParams} = require('url')

// MONGOOSE
const mongoose = require('mongoose')
const url = `mongodb+srv://pulkit29:5OnfkE2klHMlPS30@sleepprojectcluster.l3dou.mongodb.net/UserDataDB?retryWrites=true&w=majority`;

mongoose.connect(url)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

const schema = new mongoose.Schema({
    email: String,
    password: String
})

const UserData = mongoose.model('Data', schema);

//LOGIN/SIGNUP 
// GET REQUESTS
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/Login/index.html");
})
app.get("/login", (req, res) => {
    res.sendFile(__dirname + "/Login/login.html");
})
app.get("/signup", (req, res) => {
    res.sendFile(__dirname + "/Login/signup.html");
})

// POST REQUESTS
app.post("/login-route", (req, res) => {
    res.redirect("/login");
})
app.post("/signup-route", (req, res) => {
    res.redirect("/signup");
})

app.post("/login", (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    UserData.findOne({'email': email, 'password': password}, (err, data) => {
        if (data === null) {
            res.send("User not Found !");
        }
        else {
            const pathname = '/user?'
            const components = {
                id: data._id
            }
            const urlParameters = new URLSearchParams(components);  
            res.redirect(pathname + urlParameters);
        }
    })
})

app.post("/signup", (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    UserData.findOne({'email': email, 'password': password}, (err, data) => {
        if (data != null) {
            res.send("User already Exists !");
        }
        else {
            var newData = new UserData({
                'email': email,
                'password': password
            })
            newData.save();

            const pathname = '/user?'
            const components = {
                id: data._id
            }
            const urlParameters = new URLSearchParams(components);  
            res.redirect(pathname + urlParameters);
        }
    })

})

// USER INTERFACE(HOME)
app.get("/user", (req, res) => {
    res.render('home', {action: req.query.id});
})
app.post("/user", (req, res) => {
    res.render('user', {});
})


// PORT
app.listen(3000, () => {
    console.log("Server started at port 3000");
})