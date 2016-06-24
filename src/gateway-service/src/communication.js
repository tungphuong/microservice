"use strict";

let config = require('config');

//let commonCrypt = require('../../common-util/commoncrypt');
//let consulClient = require('../../common-util/commonconsul');
//let constants = require('./constants');

// let seneca = require('seneca')()
//      .use('seneca-amqp-transport');
//     // .client({
//     //     type: 'amqp',
//     //     // url: `amqp://${config.get('rabbitmq.username')}:${config.get('rabbitmq.password')}@${config.get('rabbitmq.host')}:${config.get('rabbitmq.port')}`,
//     //     url: 'amqp://trungdt:123absoft.vn@pm.absoft.vn:5672',
//     //     pin: 'role:communicationservice'
//     // });

let express = require('express');
let router = express.Router();

//seneca.ready(function (err) {





router.get('/ping', (req, res, next) => {
    //console.log(req.seneca);

    //res.json({});
    req.seneca.act({ role: 'communicationservice', cmd: 'ping' }, (err, result) => {
        if (err) {
            console.log(err);
            res.json(err);
        }
        else {
            console.log(result);
            res.json(result);
        }

    });
    // seneca.client({
    //     type: 'amqp',
    //     // url: `amqp://${config.get('rabbitmq.username')}:${config.get('rabbitmq.password')}@${config.get('rabbitmq.host')}:${config.get('rabbitmq.port')}`,
    //     url: 'amqp://trungdt:123absoft.vn@pm.absoft.vn:5672',
    //     pin: 'role:communicationservice'
    // }).act({ role: 'communicationservice', cmd: 'ping' }, (err, result) => {
    //     if (err) {
    //         console.log(err);
    //         res.statusCode(500).json(err);
    //     }
    //     console.log(result);
    //     res.json(result);
    // });
})



//});

module.exports = router;




// client.act({ role: 'communicationservice', cmd: 'ping' }, (err, result) => {
//     if (err) {
//         console.log(err);
//     }
//    console.log(result);
// });



