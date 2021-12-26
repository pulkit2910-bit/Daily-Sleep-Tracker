const mongoose = require('mongoose');
const { ObjectID } = require('bson');
const { timeStamp, time } = require('console');
const url = `mongodb+srv://pulkit29:5OnfkE2klHMlPS30@sleepprojectcluster.l3dou.mongodb.net/UserDataDB?retryWrites=true&w=majority`;

const connectDB = () => {

    mongoose.connect(url)
        .then( () => {
            console.log('Connected to database ')
        })
        .catch( (err) => {
            console.error(`Error connecting to the database. \n${err}`);
        })

}

module.exports = connectDB;