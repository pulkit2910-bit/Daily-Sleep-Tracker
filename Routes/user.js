const express = require('express');
const router = express.Router();
const UserData = require('../models/db');

router.get("/user", (req, res) => {
    res.render('home', {action: req.query.id});
})

router.post("/user", (req, res) => {
    const pathname = '/user/new-entry?';
    const components = {
        id: req.query.id
    }
    const urlParameters = new URLSearchParams(components);  
    res.redirect(pathname + urlParameters);
})

// NEW ENTRY
router.get("/user/new-entry", (req, res) => {
    res.render('entry', {action: req.query.id});
})

router.post("/user/new-entry", (req, res) => {
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

module.exports = router;