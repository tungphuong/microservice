"use strict";

let constants = require('./constants');

let express = require('express');
let router = express.Router();
let passport = require('passport');
let path = require('path');
let seneca = require('seneca')();

let consulClient = require('../../common-util/commonconsul');

router.get('/login', (req, res) => {
    consulClient.getServiceInfo(constants.SERVICES.USER_SERVICE)
        .then((serviceInfo) => {
            seneca.client({
                port: serviceInfo.ServicePort,
                host: serviceInfo.ServiceAddress,
            }).act('userservice:login', (err, result) => {
                res.json({
                    'result': result,
                    'err': err,
                });

            });
        })
})

// router.get('/google', passport.authenticate('google', { session: false, scope: ['https://www.googleapis.com/auth/plus.login'] }));

// router.get('/google/callback',
//     passport.authenticate('google', { session: false, failureRedirect: '/login.html' }),
//     function (req, res) {
//         // save cookie with domain .api-service.com
//         // 
//         res.redirect('/index.html');
//     });

module.exports = router;