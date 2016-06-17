"use strict";

let commonCrypt = require('../../common-util/commoncrypt');
let consulClient = require('../../common-util/commonconsul');
let constants = require('./constants');

let express = require('express');
let router = express.Router();
let passport = require('passport');
let path = require('path');
let seneca = require('seneca')();

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        let error = err || info;
        if (error) {
            res.status(500).json(error);
        }
        else {
            let token = commonCrypt.createJwtToken(user);
            res.json({ Token: token, Data: user });
        }
    })(req, res, next);
})

router.get('/test', (req, res, next) => {
    consulClient.getServiceInfo(constants.SERVICES.USER_SERVICE, 3100)
        .then((serviceInfo) => {
            console.log(serviceInfo);
            seneca.client({
                port: serviceInfo.ServicePort,
                host: serviceInfo.ServiceAddress,
            }).act({ role: 'userservice', cmd: 'ping' }, (err, result) => {
                if (err) {
                    console.log(err);
                    res.statusCode(500).json(err);
                }
                res.json(result);
            });
        });
})

module.exports = router;



// router.get('/google', passport.authenticate('google', { session: false, scope: ['https://www.googleapis.com/auth/plus.login'] }));

// router.get('/google/callback',
//     passport.authenticate('google', { session: false, failureRedirect: '/login.html' }),
//     function (req, res) {
//         // save cookie with domain .api-service.com
//         // 
//         res.redirect('/index.html');
//     });