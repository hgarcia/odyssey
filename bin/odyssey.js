#!/usr/bin/env node
var migration = require('./generators/migration');
var fs = require('fs');

engine.init(process.argv.splice(2), fs, console);
