#!/bin/bash
service nginx start
consul-template -consul=$CONSUL_URL -template="/templates/app.ctmpl:/etc/nginx/conf.d/service.conf:service nginx reload"