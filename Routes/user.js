const express = require('express');
const router = express.Router();
const UserData = require('../models/db');
const BlogsData = require('../models/blogs');

// MIDDLEWARE
const {isLoggedIn} =require('../middleware/auth');

// CONTROLLER
const user_controller = require('../controllers/user_controller');

// HOME PAGE
router.get("/user/:id",  user_controller.user_homepage);

router.post("/user/:id", user_controller.user_redirect_newEntry);

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

router.post("/user/new-entry/:id", user_controller.new_entry);

// BLOGS LIST
router.get("/user/blogs/:id", user_controller.user_blogsList);

// SEPARATE ROUTE FOR EACH BLOG
router.get("/user/blog/:id", user_controller.user_eachBlog);

module.exports = router;