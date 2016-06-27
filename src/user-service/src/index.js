"use strict";

let config = require('config');
let seneca = require('seneca')();

let logger = require('../../common-util/commonlog');

seneca.use('entity');
seneca.use('mysql-store', {
	name: config.get('db.userService.dbName'),
	host: config.get('db.userService.host'),
	port: config.get('db.userService.port'),
	user: config.get('db.userService.userName'),
	password: config.get('db.userService.password'),
	options: {}
})

seneca.ready(function (err) {
	if (err) {
		return
	}

	seneca.add({ role: 'userservice', cmd: 'ping' }, (args, done) => {
		logger.log('info', '/userservice/ping');
		done(null, {
			msg: 'pong'
		})
	});

	seneca.add({ role: 'userservice', cmd: 'login' }, (args, done) => {
		console.log('login ...')
		var users = seneca.make$('users');
		users.load$({ UserName: args.userName }, (err, res) => {
			if (err) {
				return done(null, {
					ErrorAppCode: 'MSG_ERR_EXCEPTION',
					Message: JSON.stringify(err)
				});
			}
			if (res == null || res.Password !== args.password) {
				console.log(res == null || res.password !== args.password);
				return done(null, {
					ErrorAppCode: 'MSG_ERR_USER_AUTHENTICATION_FAIL',
					User: null
				});
			}
			done(null, {
				ErrorAppCode: null,
				User: {
					Id: res.Id,
					UserName: res.UserName
				}
			});
		});
	});

	seneca.listen({
		port: config.get('env.port.userservice') || 3000,
		pin: { role: 'userservice', cmd: '*' }
	})
})