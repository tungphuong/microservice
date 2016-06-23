"use strict";

var pmx = require('pmx').init({
    http: true, // HTTP routes logging (default: true)
    ignore_routes: [/socket\.io/, /notFound/], // Ignore http routes with this pattern (Default: [])
    errors: true, // Exceptions loggin (default: true)
    custom_probes: true, // Auto expose JS Loop Latency and HTTP req/s as custom metrics
    network: true, // Network monitoring at the application level
    ports: true  // Shows which ports your app is listening on (default: false)
});

let express = require('express');
let bodyParser = require('body-parser');
let logger = require('../../common-util/commonlog');
let secure = require('./secure');

let app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));

process.on('SIGTERM', () => {
    logger.log('info','Closing SIGTERM');
});

process.on('SIGINT', () => {
    logger.log('info', 'Closing SIGINT');
    process.exit();
});


secure.setup(app);

app.use(express.static( __dirname + '/../../client'));

app.use('/api/auth', require('./auth'));
app.use('/api/communication', require('./communication'));

app.use(pmx.expressErrorHandler());


app.listen(process.env.PORT);