"use strict";

let config = require('config');
let express = require('express');
let router = express.Router();

router.get('/ping', (req, res, next) => {
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
})

module.exports = router;