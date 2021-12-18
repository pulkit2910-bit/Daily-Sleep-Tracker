const express = require('express');
const router = express.Router();
const UserData = require('../models/db');
const path = require("path");
const { verify } = require('jsonwebtoken');
const { hash, compare } = require('bcryptjs');

router.get("/signup", (req, res) => {
    res.sendFile(path.join(__dirname + "/../public/Login/signup.html"));
})

router.post("/signup", (req, res) => {
    var email = req.body.email;
    var password = req.body.password;

    try {

        // 1. Check if user exists
        UserData.findOne({'email': email}, async (err, data) => {
            if (data) {
                throw new Error('User already exists');
            }
            else {
                // 2. If user does not exist, hash the password
                const hashedPassword = await hash(password, 10);

                var newData = new UserData({
                    'email': email,
                    'password': hashedPassword
                })
                newData.save();
                
                const pathname = '/user/'
                const components = {
                    id: newData._id
                }
                const urlParameters = new URLSearchParams(components);  
                res.redirect(pathname + urlParameters);
            }
        })
    } catch(err) {
        res.send(err);
    }

    // UserData.findOne({'email': email}, (err, data) => {
    //     if (data != null) {
    //         res.send("User already Exists !");
    //     }
    //     else {
    //         var newData = new UserData({
    //             'email': email,
    //             'password': password
    //         })
    //         newData.save();
            
    //         const pathname = '/user?'
    //         const components = {
    //             id: newData._id
    //         }
    //         const urlParameters = new URLSearchParams(components);  
    //         res.redirect(pathname + urlParameters);
    //     }
    // })

})

module.exports = router;