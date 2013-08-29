#!/usr/bin/env node
"use strict";
var generators = {};
var fs = require('fs');
var ArgumentParser = require("argparse").ArgumentParser;
var parser = new ArgumentParser({
  title: "Odyssey is a pluggable data migration tool"
});

var subparsers = parser.addSubparsers({
  title: "Odyssey subcommands"
});

var files = fs.readdirSync(__dirname + "/generators");

files.forEach(function (file) {
  var name = file.replace(".js", "");
  generators[name] = require("./generators/" + name);
  generators[name].register(subparsers);
});

function start(args){
  var options = parser.parseArgs(args);
  var name = args[0];
  if (generators[name] && generators[name].create) {
    generators[name].create(options, fs, console);
  }
}

start(process.argv.splice(2));
