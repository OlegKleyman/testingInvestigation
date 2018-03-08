'use strict';

var config = require(`./${process.env.NODE_ENV.trim()}.js`);

module.exports = config;