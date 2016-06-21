'use strict'

let Bluebird = require('bluebird');
let Consul = require('consul');
let config = require('config');

let logger = require('./commonlog');

class ConsulClient {
    constructor() {
        if (process.env.NODE_ENV !== 'development') {
            this.consulClient = new Consul({
                host: config.get('consul.ip'),
                port: config.get('consul.port'),
                promisify: this.fromCallback
            });
        }
    }

    fromCallback(fn) {
        return new Bluebird(function (resolve, reject) {
            try {
                return fn(function (err, data, res) {
                    if (err) {
                        err.res = res;
                        return reject(err);
                    }
                    return resolve([data, res]);
                });
            } catch (err) {
                return reject(err);
            }
        });
    }

    getServiceInfo(serviceName, port) {
        if (process.env.NODE_ENV === 'development') {
            Promise.resolve({
                serviceName: serviceName,
                ServicePort: port,
                ServiceAddress: '127.0.0.1'
            });
        }
        else {
            let service = `${serviceName}-${port}`;
            return this.consulClient.catalog.service.nodes(service)
                .then((data, res) => {
                    logger.log('info', data[0][0]);
                    return data[0][0];
                });
        }
    }
}

module.exports = new ConsulClient();