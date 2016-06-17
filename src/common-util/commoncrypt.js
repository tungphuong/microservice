'use strict'

let jwt = require('jsonwebtoken');
let config = require('config');

class CommonCrypt {
    createJwtToken(objIn) {
        return jwt.sign(objIn, config.jwtSecret, { expiresIn: 60 * 60 * 24 * 7 });
    }
}

module.exports = new CommonCrypt();