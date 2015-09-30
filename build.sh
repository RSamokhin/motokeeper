#!/usr/bin/env bash
rm -rf web/node_modules
rm -rf web/bower_components
rm -rf web/build
cd web
npm install -g bower gulp
npm install
bower install
gulp build