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
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    refreshToken: String,
    weekData: [
        {
            sleepTime: String,
            wakeupTime: String
        }
    ] //array of objects
})

const UserData = mongoose.model('Data', schema);
module.exports = UserData;