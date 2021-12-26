const UserData = require('../models/db')
const BlogsData = require('../models/blogs');
const { hash, compare } = require('bcryptjs');

const admin_login = (req, res) => {

    const email = req.body.email;
    const password = req.body.password;

    UserData.findOne({'email': "ranjanpulkit2910@gmail.com"}, async (err, data) => {

        if (!data) throw new Error("Admin not Found !");

        else {
            const valid  = await compare(password, data.password);
            if (!valid) res.send("Wrong Password");

            const pathname = '/admin/panel/';
            const urlParameters = data._id;  
            res.redirect(pathname + urlParameters);
        }

    })

}

const admin_blog_compose = (req, res) => {
    const title = req.body.title;
    const content = req.body.content;
    const subContent = content.substring(0, 50);
    
    BlogsData.findOne({'title': title, 'content': content}, (err, data) => {

        if (data) res.send('Blog already exists!');
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
}

const admin_blogsList = (req, res) => {

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

}

module.exports = {
    admin_login,
    admin_blog_compose,
    admin_blogsList
}