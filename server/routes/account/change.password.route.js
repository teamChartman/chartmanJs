const { User, validate } = require('../../models/user.model');
const passport = require('passport');
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const jwt = require('jsonwebtoken');
const config = require('config');
const { getEncryptedPwd, comparePwd}  = require('../../middleware/crypto');

router.post('/', passport.authenticate('jwt', {session: false}),  async (req, res)=>{
    // const {error} = validate(req.body);
    let currentPassword;
    let newPassword;
    if(! req.body){
       return res.status(400).send("It looks like you have sent a Bad request to the server");
    }
    currentPassword = req.body.currentPassword;
    newPassword = req.body.newPassword;
    const authorization = req.headers.authorization;
    const decoded = jwt.verify(authorization.split(' ')[1], config.get('jwtPrivateKey'));
    let user = await User.findOne({'email' : decoded.email});
    if(!user){
        return res.status(400).send("Something wrong with the user account");
    }
    const verifiedPwd =  await comparePwd(currentPassword, user.password);
    if( !verifiedPwd){
        // console.log("Password did not match with records");
        return res.status(400).send("Your current password does not match with the records");
    }
    // console.log("records - old password ", user.password);
    
    const newEncryptedPwd = await getEncryptedPwd(newPassword);
    // console.log("Record - the password that will be updated is ", newEncryptedPwd);
    let result = await User.findOneAndUpdate({'email' : decoded.email}, {password : newEncryptedPwd}, {'new' : true});
   
    // user.password = newEncryptedPwd;
    // result = await user.save();
    if(result) console.log(" password changed", result);
    res.send(_.pick(result, ['_id', 'name', 'email', 'authorities', 'status']));
})
module.exports=router;