"use strict";

let express = require('express');
let router = express.Router();
let config = require('config');

let commonCrypt = require('../../common-util/commoncrypt');
let consulClient = require('../../common-util/commonconsul');
let constants = require('./constants');
let seneca = require('seneca')()
    .use('seneca-amqp-transport');


seneca.ready(function (err) {
    if (err) {
        return;
    }

    router.get('/ping', (req, res, next) => {
        console.log('123456');
        seneca.client({
            type: 'amqp',
            url: `amqp://${config.get('rabbitmq.username')}:${config.get('rabbitmq.password')}@${config.get('rabbitmq.host')}:${config.get('rabbitmq.port')}`,
            pin: 'role:communicationservice'
        }).act({ role: 'communicationservice', cmd: 'ping' }, (err, result) => {
            if (err) {
                console.log(err);
                res.statusCode(500).json(err);
            }
            res.json(result);
        });
    })
})

module.exports = router;
