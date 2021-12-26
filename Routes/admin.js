const express = require('express');
const router = express.Router();
const UserData = require('../models/db')
const BlogsData = require('../models/blogs');
const path = require("path");
const { hash, compare } = require('bcryptjs');

//CONTROLLER
const admin_controller = require('../controllers/admin_controller')

// LODASH FOLDERS
var _ = require('lodash');

router.get("/admin", (req, res) => {
    res.render('admin/admin_login');
})

router.post("/admin", admin_controller.admin_login);

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

router.post("/admin/compose/:id", admin_controller.admin_blog_compose);

// List of Blogs made
router.get("/admin/blogs/:id", admin_controller.admin_blogsList);

// Full Blog separate route
// ERROR
router.get("/admin/:blogID", (req, res) => {
    
    const findObject = (val) => {
        return BlogsData.findOne({'_id': val}).exec();
    }
    
    async () => {
        const data = await findObject(req.params.blogID);
        res.render('blog', {title: data.title, content: data.content});
    }
})

module.exports = router;


