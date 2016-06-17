'use strict'

let config = require('config');
let passport = require('passport');
//let GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
let LocalStrategy = require('passport-local').Strategy;
let logger = require('../../common-util/commonlog');
let seneca = require('seneca')();

let consulClient = require('../../common-util/commonconsul');
let commonUtil = require('../../common-util/commonutil');
let constants = require('./constants');

class Secure {
    constructor() {
    }

    setup(app) {
        app.use(passport.initialize());

        passport.use(new LocalStrategy({
            usernameField: 'UserName',
            passwordField: 'Password',
            session: false,
            passReqToCallback: true
        }, (req, userName, password, done) => {
            let passingArgs = {
                userName: userName,
                password: password
            };
            consulClient.getServiceInfo(constants.SERVICES.USER_SERVICE, 3100)
                .then((serviceInfo) => {
                    seneca.client({
                        port: serviceInfo.ServicePort,
                        host: serviceInfo.ServiceAddress,
                    }).act({ role: 'userservice', cmd: 'login' }, passingArgs,
                        (err, result) => {
                            if (err) {
                                return done(null, false, {
                                    ErrorAppCode: user.MSG_ERR_EXCEPTION,
                                    UserName: userName,
                                    Message: JSON.stringify(err)
                                });
                            }
                            if (!commonUtil.isBlank(result.ErrorAppCode)) {
                                return done(null, false, {
                                    AppCode: result.ErrorAppCode,
                                    UserName: userName,
                                    User: result
                                });
                            }
                            return done(null, result);
                        });
                })
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