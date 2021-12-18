require('dotenv/config')
const { sign } = require('jsonwebtoken');

const createAccessToken = (objectID) => {
    return sign({ id: objectID }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '15m',
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

module.exports = {
    createAccessToken,
    createRefreshToken,
    sendAccessToken,
    sendRefreshToken
}