"use strict";

// var pmx = require('pmx').init({
//   http: true, // HTTP routes logging (default: true)
//   ignore_routes: [/socket\.io/, /notFound/], // Ignore http routes with this pattern (Default: [])
//   errors: true, // Exceptions loggin (default: true)
//   custom_probes: true, // Auto expose JS Loop Latency and HTTP req/s as custom metrics
//   network: true, // Network monitoring at the application level
//   ports: true  // Shows which ports your app is listening on (default: false)
// });

let seneca = require('seneca')();

seneca.ready(function (err) {
  if (err) return

  seneca.add('userservice:login', (args, done) => {
    console.log('is processing...');
    setTimeout(() => {
      done(null, { hex: '#FF0000' });
    }, 2000);
  });

  seneca.listen({
    port: process.env.PORT
  })
})