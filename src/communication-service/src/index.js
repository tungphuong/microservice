"use strict";

let config = require('config');
let seneca = require('seneca')();

let logger = require('../../common-util/commonlog');

seneca.use('entity');
seneca.use('seneca-amqp-transport');

seneca.ready(function (err) {
    if (err) {
        return
    }

    seneca.add({ role: 'communicationservice', cmd: 'ping' }, (args, done) => {
        console.log('/communicationservice/ping');
        done(null, {
            msg: 'pong'
        })
    });

    seneca.listen({
        type: 'amqp',
        url: `amqp://${config.get('rabbitmq.username')}:${config.get('rabbitmq.password')}@${config.get('rabbitmq.host')}:${config.get('rabbitmq.port')}`,
        pin: 'role:communicationservice'
    });
})