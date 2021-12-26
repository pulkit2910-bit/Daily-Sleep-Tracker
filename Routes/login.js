const express = require('express');
const router = express.Router();
const UserData = require('../models/db');
const { createAccessToken, createRefreshToken, sendAccessToken, sendRefreshToken } = require('./token');
const { verify } = require('jsonwebtoken');
const { hash, compare } = require('bcryptjs');

router.post("/login", (req, res) => {

    var email = req.body.email.trim();
    var password = req.body.password;

    UserData.findOne({'email': email}, async (err, data) => {
        // 1. If user does not exist
        if (!data) {
            res.send("User not Found !");
        }
        // 2. If User exists, compare password
        else {
            const valid  = await compare(password, data.password);
            if (!valid) res.send("Wrong Password");

            // 3. Create Refresh and Access Token
            
            const accessToken = createAccessToken(data._id);
            const refreshToken = createRefreshToken(data._id);

            data.refreshToken = refreshToken;

            const pathname = '/user/'
            const urlParameters = data._id;  
            res.redirect(pathname + urlParameters);
        }
    })
    
})

module.exports = router;