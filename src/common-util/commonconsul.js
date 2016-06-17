'use strict'

let Bluebird = require('bluebird');
let Consul = require('consul');
let config = require('config');

let logger = require('./commonlog');
let dummyService = require('../config/dummyservice');

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
            let serviceObj = dummyService.find(x => x.serviceName == serviceName);
            console.log(serviceObj);
            if (serviceObj != undefined) {
                return Promise.resolve(serviceObj);
            }
            else {
                return Promise.reject(`cannot find serivce ${serviceName}`);
            }
        }
        else {
            let service = `microservice_loadbalancer${serviceName}-${port}`
            return this.consulClient.catalog.service.nodes(service)
                .then((data, res) => {
                    return data[0][0];
                });
        }
    }
}

module.exports = new ConsulClient();