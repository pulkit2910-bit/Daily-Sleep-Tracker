const express = require('express');
const router = express.Router();
const UserData = require('../models/db');

router.post("/login", (req, res) => {
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

module.exports = router;