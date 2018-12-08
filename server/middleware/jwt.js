const jwt = require('jsonwebtoken');
const config = require('config');

exports.loginRequired = function (req, res, next) {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user!' });
    }
};


exports.extractUser = function (req, res, next) {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jwt.verify(req.headers.authorization.split(' ')[1], '', function (err, decode) {
            if (err) req.user = undefined;
            else
                req.user = decode;
            next();
        });
    } else {
        req.user = undefined;
        next();
    }
};