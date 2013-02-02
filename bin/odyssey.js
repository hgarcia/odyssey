#!/usr/bin/env node
var engine = require('./engines/generators');
var fs = require('fs');

engine.init(process.argv.splice(2), fs, console);
