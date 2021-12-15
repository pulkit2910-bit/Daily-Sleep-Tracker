const express = require('express');
const router = express.Router();
const UserData = require('../models/db');
const path = require("path");

router.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname + "/../public/Login/signup.html"));
})

router.post("/signup", (req, res) => {
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

module.exports = router;