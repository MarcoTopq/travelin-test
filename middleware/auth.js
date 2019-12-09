'use strict'
let jwt = require('jsonwebtoken');
let config = require('../config/index');

module.exports = {
    checkToken: (req, res, next) => {
        try {
            console.log(req.headers)
            var token = req.headers.authorization;
            console.log(token)
            var decoded = jwt.verify(token, config.secret);
            console.log(decoded)
            req.user = decoded;
            next();
        } catch (err) {
            console.log(err)
            res.status(401).json({
                message: 'Token is Invalid'
            });
        }
    },
    isAuthorized: (req, res, next) => {
        if (req.user.role == 'admin') {
            next();
        } else {
            res.status(401).json({
                message: 'User Not Authorized'
            });
        }
    },
};