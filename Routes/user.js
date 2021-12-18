const express = require('express');
const router = express.Router();
const UserData = require('../models/db');
const BlogsData = require('../models/blogs');

router.get("/user/:id", (req, res) => {
    if (req.params === null) {
        res.sendStatus(404).send("Page not found");
    } else {
        res.render('home', {action: req.params.id});
    }
})

router.post("/user/:id", (req, res) => {
    if (req.params === null) {
        res.sendStatus(404).send("Page not found");
    } else {

        const pathname = '/user/new-entry/';
        const urlParameters = req.params.id;  
        res.redirect(pathname + urlParameters);

    }
})

// Buttons for home page
router.post("/user/newEntry-route/:id", (req, res) => {
    const pathname = '/user/new-entry/';
    const urlParameters = req.params.id;  
    res.redirect(pathname + urlParameters);
})
router.post("/user/blogs-route/:id", (req, res) => {
    const pathname = '/user/blogs/';
    const urlParameters = req.params.id;  
    res.redirect(pathname + urlParameters);
})

// NEW ENTRY
router.get("/user/new-entry/:id", (req, res) => {
    if (req.params === null) {
        res.sendStatus(404).send("Page not found");
    } else {
        res.render('entry', {action: req.params.id});
    }
})

router.post("/user/new-entry/:id", (req, res) => {
    var sleepTime = req.body.sleepTime;
    var wakeupTime = req.body.wakeupTime;

    UserData.updateOne({'_id': req.params.id}, 
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

// BLOGS
router.get("/user/blogs/:id", (req, res) => {

    BlogsData.find({}, (err, data) => {
        try {

            if (!data) res.send("No blogs available");
            else {
                res.render('blogsList', {posts: data});
            }

        } catch(err) {
            res.send(err);
        }
    });

})

module.exports = router;