require('dotenv/config')
const { sign, verify } = require('jsonwebtoken');
const UserData = require('../models/db');

const createAccessToken = (object) => {
    return sign({ object: object}, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '10s',
    })
};

const createRefreshToken = (objectID) => {
    return sign({ id: objectID }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '7d',
    })
};

const sendAccessToken = (req, res, accessToken) => {
    res.send({
        accessToken,
        email: req.body.email
    })
}

const sendRefreshToken = (res, refreshToken) => {
    res.cookie('refreshToken', token, {
        httpOnly: true,
        path: '/refresh-token'
    })
}

const findByToken = (token, cb) => {
    verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decode) => {
        UserData.findOne({"_id": decode, "token":token},function(err,data){
            if(err) return cb(err);
            cb(null,data);
        })
    })
}

module.exports = {
    createAccessToken,
    createRefreshToken,
    sendAccessToken,
    sendRefreshToken
}