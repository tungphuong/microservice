'use strict'

let Bluebird = require('bluebird');
let Consul = require('consul');

class ConsulClient {
    constructor() {
        this.consulClient = new Consul({
            host: '127.0.0.1',
            port: 8500,
            promisify: this.fromCallback
        });
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
    
    getServiceInfo(serviceName){
        return this.consulClient.catalog.service.nodes(serviceName)
            .then((data, res)=>{
                return data[0][0];
            });
    }
}

module.exports = new ConsulClient();