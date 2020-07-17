// This file is responsible to enable esm

require = require('esm')(module /*, options*/);
module.exports = require('./src/server.js');
