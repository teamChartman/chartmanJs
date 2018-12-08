const { User, validate } = require('../../models/user.model');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('config');
const loginRequired = require('../../middleware/jwt').loginRequired;

router.get('/', loginRequired, (req, res)=>{
    res.send(req.user);  //req.user is attached by extractUser Middleware function
});

module.exports=router;
