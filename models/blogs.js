// MONGOOSE
const mongoose = require('mongoose');
const { ObjectID } = require('bson');
const { timeStamp, time } = require('console');

const schema = new mongoose.Schema({
    title: String,
    subcontent: String,
    content: String
})

const Blogs = mongoose.model('Blog', schema);
module.exports = Blogs;