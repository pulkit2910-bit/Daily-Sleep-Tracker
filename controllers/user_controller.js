const UserData = require('../models/db')
const BlogsData = require('../models/blogs');

const new_entry = (req, res) => {
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
}

const user_homepage = (req, res) => {
    if (req.params === null) {
        res.sendStatus(404).send("Page not found");
    } else {

        BlogsData.find({}, (err, data) => {
            try {
    
                if (!data) res.send("No blogs available");
                else {
                    res.render('home', {action: req.params.id, blogs: data});
                }
    
            } catch(err) {
                res.send(err);
            }
        });
    }
}

const user_blogsList = (req, res) => {

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

}

const user_eachBlog = (req, res) => {
    BlogsData.findOne({'_id': req.params.id}, (err, data) => {

        if (!data) res.send("Blog not found !");
        else {
            res.render('blog', {title: data.title, content: data.content});
        }

    })
}

const user_redirect_newEntry = (req, res) => {

    if (req.params === null) {
        res.sendStatus(404).send("Page not found");
    } else {

        const pathname = '/user/new-entry/';
        const urlParameters = req.params.id;  
        res.redirect(pathname + urlParameters);

    }

}

module.exports = {
    new_entry,
    user_homepage, 
    user_blogsList,
    user_eachBlog,
    user_redirect_newEntry
}