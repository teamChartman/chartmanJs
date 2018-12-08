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

    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        jwt.verify(req.headers.authorization.split(' ')[1], config.get('jwtPrivateKey'), function (err, decoded) {
            if (err) req.user = undefined;
            else
                req.user = decoded;
            next();
        });
    } else {
        req.user = undefined;
        next();
    }
};