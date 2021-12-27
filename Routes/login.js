require('dotenv/config')
const express = require('express');
const router = express.Router();
const UserData = require('../models/db');
const { hash, compare } = require('bcryptjs');
const cookieParser=require('cookie-parser');

// MIDDLEWARE
const {validateUser} = require('../middleware/validation')

router.post("/login", validateUser, (req, res) => {

    var email = req.body.email;
    var password = req.body.password;

    UserData.findOne({'email': email}, async (err, user) => {
        // 1. If user does not exist
        if (!user) {
            return res.json({isAuth : false, message : ' Auth failed ,email not found'});
        }
        // 2. If User exists, compare password
        else {
            const valid  = await compare(password, user.password);
            if (!valid) return res.json({ isAuth : false,message : "password doesn't match"});

            const pathname = '/user/'
            const urlParameters = user._id;  
            res.redirect(pathname + urlParameters);
        }
    })

    
})

module.exports = router;