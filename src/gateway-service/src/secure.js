'use strict'

let config = require('config');
let passport = require('passport');
//let GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
let LocalStrategy = require('passport-local').Strategy;
let logger = require('../../common-util/commonlog');

class Secure {
    constructor() {
    }

    setup(app) {
        app.use(passport.initialize());

        passport.use(new LocalStrategy({
            usernameField: 'Username',
            passwordField: 'Password',
            session: false,
            passReqToCallback: true
        }, (req, username, password, done) => {

        }));

        //app.use(passport.session());

        // passport.serializeUser(function (user, cb) {
        //     cb(null, user);
        // });

        // passport.deserializeUser(function (obj, cb) {
        //     cb(null, obj);
        // });

        // passport.use(new GoogleStrategy({
        //     clientID: config.get('auth.google.clientID'),
        //     clientSecret: config.get('auth.google.clientSecret'),
        //     callbackURL:config.get('auth.google.urlhost')
        // }, (accessToken, refreshToken, profile, done)=>{
        //     logger.log('info', `Accesstoken ${accessToken}`);
        //     done(null, profile);
        // }))
    }
}

module.exports = new Secure();