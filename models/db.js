// MONGOOSE
const mongoose = require('mongoose');
const { ObjectID } = require('bson');
const { timeStamp, time } = require('console');

const schema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    weekData: [
        {
            sleepTime: String,
            wakeupTime: String
        }
    ] //array of objects
})

const UserData = mongoose.model('Data', schema);
module.exports = UserData;