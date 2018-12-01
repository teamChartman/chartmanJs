const express = require('express');
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const _  = require('lodash');
const config = require('config');


const router = express.Router();
const { User } = require('../models/user.model');
const { comparePwd } = require('../middleware/crypto')
function validate(user){
    const schema = {
        email : Joi.string().min(5).max(255).required().email(),
        password : Joi.string().min(8).max(1024).required()
    };
    return Joi.validate(user, schema)
}
router.post('/', async (req, res)=>{
    const { error } = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    const user = await User.findOne({email : req.body.email});
    if(!user) return res.status(400).send({message : 'Invalid email'});
    const isValid = await comparePwd(req.body.password, user.password);
    if(!isValid) return res.status(400).send({message : 'Invalid  password'});

    const token = jwt.sign(_.pick(user, ['_id', 'name', 'email', 'authorities']), config.get('jwtPrivateKey'), {
         expiresIn : 86400

    } );
   
    res.header('Authorization', "Bearer "+token);
    res.header('Access-Control-Expose-Headers', 'Authorization');
    res.send({'success' : true, 'message':'Authentication success', 'token': 'Bearer '+token});

});

module.exports = router;