"use strict";

let logger = require('../../common-util/commonlog');

process.on('SIGTERM', () => {
    logger.log('info', 'Closing SIGTERM');
});

process.on('SIGINT', () => {
    logger.log('info', 'Closing SIGINT');
    process.exit();
});

// always capture, log and exit on uncaught exceptions
// your production system should auto-restart the app
// this is the Node.js way
process.on('uncaughtException', function (err) {
    logger.log('error', 'uncaughtException:', err.message)
    logger.log('error', err.stack)
    process.exit(1)
})

let config = require('config');

// load the seneca module and create a new instance
// note that module returns a function that constructs seneca instances (just like express)
// so you if you call it right away (as here, with the final () ), you get a default instance
let seneca = require('seneca')();
seneca.use('seneca-amqp-transport')
    .client({
        type: 'amqp',
        url: `amqp://${config.get('rabbitmq.username')}:${config.get('rabbitmq.password')}@${config.get('rabbitmq.host')}:${config.get('rabbitmq.port')}`,
        pin: 'role:communicationservice'
    })
    .client({        
        port: config.get('env.loadbalance.userservice_port'),
        host: config.get('env.loadbalance.userservice_host'),
        pin: { role: 'userservice', cmd: '*' }
    });

let express = require('express');
let bodyParser = require('body-parser');
let secure = require('./secure');

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

app.use(seneca.export('web'));

secure.setup(app);

app.use(express.static(__dirname + '/../../client'));

app.use('/api/auth', require('./auth'));
app.use('/api/communication', require('./communication'));

app.listen(config.get('env.port.gatewayservice') || 3000);