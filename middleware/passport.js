const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const config = require('config');
const { User } = require('../models/user.model');

module.exports = function(passport){
let opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = config.jwtPrivateKey;
    passport.use(new JwtStrategy(opts, async (jwt_payload, done) =>{
        const user = await User.findById(jwt_payload._id);
        if(!user) done('Something is wrong', false);
        done(null, true);
    }))};