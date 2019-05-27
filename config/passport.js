//passport js takes the jwt and verifies, passport uses something called strategy for different types of authentication
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const Keys = require('../config/keys');


const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = Keys.secretOrKey;


module.exports = passport => {
    passport.use(
        //extracts the payload(i.e the user information)
        new JwtStrategy(opts, (jwt_payload, done) => {
            //findes the user and validates it
            User.findById(jwt_payload.id).then(user => {
                if (user) {
                    return done(null, user);
                }
                return done(null, false);
            })
        })
    );
};