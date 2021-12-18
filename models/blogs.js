// MONGOOSE
const mongoose = require('mongoose');
const { ObjectID } = require('bson');
const { timeStamp, time } = require('console');
const url = `mongodb+srv://pulkit29:5OnfkE2klHMlPS30@sleepprojectcluster.l3dou.mongodb.net/UserDataDB?retryWrites=true&w=majority`;

mongoose.connect(url)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

const schema = new mongoose.Schema({
    title: String,
    subcontent: String,
    content: String
})

const Blogs = mongoose.model('Blog', schema);
module.exports = Blogs;