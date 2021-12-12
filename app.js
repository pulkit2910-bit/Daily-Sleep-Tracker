// EXPRESS
const express = require('express');
const app = express();
app.use(express.urlencoded())
app.use(express.static("public"));
app.set('view engine', 'ejs');

const {URLSearchParams} = require('url')

// MONGOOSE
const mongoose = require('mongoose');
const { ObjectID } = require('bson');
const { timeStamp, time } = require('console');
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
    password: String,
    weekData: [
        {
            sleepTime: String,
            wakeupTime: String
        }
    ] //array of objects
})

const UserData = mongoose.model('Data', schema);

//LOGIN/SIGNUP 
// GET REQUESTS
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/Login/index.html");
})
app.get("/signup", (req, res) => {
    res.sendFile(__dirname + "/Login/signup.html");
})

// POST REQUESTS
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
                id: newData._id
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
    const pathname = '/user/new-entry?';
    const components = {
        id: req.query.id
    }
    const urlParameters = new URLSearchParams(components);  
    res.redirect(pathname + urlParameters);
})

// NEW ENTRY
app.get("/user/new-entry", (req, res) => {
    res.render('entry', {action: req.query.id});
})
app.post("/user/new-entry", (req, res) => {
    var sleepTime = req.body.sleepTime;
    var wakeupTime = req.body.wakeupTime;

    UserData.updateOne({'_id': req.query.id}, 
    {$push: 
        {
            weekData: {
                'sleepTime': sleepTime,
                'wakeupTime': wakeupTime
            }
        }
    }, function (err, docs) {
            if (err){
                console.log(err)
            }
            else{
                console.log("Updated Docs : ", docs);
            }
    });
})


// PORT
app.listen(3000, () => {
    console.log("Server started at port 3000");
})