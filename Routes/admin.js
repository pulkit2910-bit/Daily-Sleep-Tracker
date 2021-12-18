const express = require('express');
const router = express.Router();
const UserData = require('../models/db')
const BlogsData = require('../models/blogs');
const path = require("path");
const { hash, compare } = require('bcryptjs');

// LODASH FOLDERS
var _ = require('lodash');

// DATE FUNCTION
function dayDate() {
    let date = new Date();
    options = {
        weekday: 'long',
        year: 'numeric',
        day: 'numeric',
        month: 'numeric'
    }
    
    return date.toLocaleDateString('en-US', options);
}

router.get("/admin", (req, res) => {
    res.render('admin/admin_login');
})

router.post("/admin", (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    UserData.findOne({'email': "ranjanpulkit2910@gmail.com"}, async (err, data) => {

        if (!data) throw new Error("Admin not Found !");

        else {
            const valid  = await compare(password, data.password);
            if (!valid) throw new Error("Wrong Password");

            const pathname = '/admin/panel/';
            const urlParameters = data._id;  
            res.redirect(pathname + urlParameters);
        }

    })

})

router.get("/admin/panel/:id", (req, res) => {
    res.render('admin/admin_panel', {action: req.params.id});
})

// Buttons in admin/panel/:id
router.post("/admin/compose-route/:id", (req, res) => {
    const pathname = '/admin/compose/';
    const urlParameters = req.params.id;  
    res.redirect(pathname + urlParameters);
})
router.post("/admin/blogs-route/:id", (req, res) => {
    const pathname = '/admin/blogs/';
    const urlParameters = req.params.id;  
    res.redirect(pathname + urlParameters);
})

// Composing a Blog
router.get("/admin/compose/:id", (req, res) => {
    res.render('admin/admin_compose', {action: req.params.id});
})

router.post("/admin/compose/:id", (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const subContent = content.substring(0, 50);
    
    BlogsData.findOne({'title': title, 'content': content}, (err, data) => {

        if (data) throw new Error('Blog already exists!');
        else {

            var newBlog = new BlogsData({
                'title': title,
                'subcontent': subContent,
                'content': content
            })
            newBlog.save();
            console.log("Blog saved");
        }
    })

    const pathname = '/admin/blogs/';
    const urlParameters = req.params.id;  
    res.redirect(pathname + urlParameters);
})

// List of Blogs made
router.get("/admin/blogs/:id", (req, res) => {

    BlogsData.find({}, (err, data) => {
        try {

            if (!data) res.send("No blogs available");
            else {
                res.render('admin/admin_blogs', {posts: data});
            }

        } catch(err) {
            res.send(err);
        }
    });

})

// Full Blog separate route
router.get("/admin/:blogID", (req, res) => {
    BlogsData.findOne({'_id': req.params.blogID}, (err, data) => {
        res.render('blog', {title: data.title, content: data.content});
    })
})

module.exports = router;


