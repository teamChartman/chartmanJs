const { User, validate } = require('../models/user.model');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('config');

router.get('/', passport.authenticate('jwt', {session: false}), (req, res)=>{
    
    
    if(!req.headers.authorization){
       return res.status(500).send("Something went wrong"); 
      }
        
    const authorization = req.headers.authorization;
    let decoded;
    try {
        decoded = jwt.verify(authorization.split(' ')[1], config.get('jwtPrivateKey'));
    } catch (e) {
        return res.status(401).send('unauthorized');
    }
    res.send(decoded);
    
    

});

module.exports=router;
