const jwt = require('jsonwebtoken');
const config = require('config');

function getUserObject(header){
    if(!header){
        return null;
       }
    const authorization = header;
    const  decoded = jwt.verify(authorization.split(' ')[1], config.get('jwtPrivateKey'));
    return decoded;
}

exports.getUserObject = getUserObject
     
 
