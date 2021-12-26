require('dotenv/config');
const UserData=require('../models/db');
const jwt = require('jsonwebtoken');

let isLoggedIn = (req, res, next) => {
    const token = req.headers.split(' ')[1];
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );
    req.userData = decoded;
    next();
    // try {
    // } catch (err) {
    //   return res.status(401).send({
    //     msg: 'Your session is not valid!'
    //   });
    // }
  }

module.exports={isLoggedIn};