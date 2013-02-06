#!/usr/bin/env node
"use strict";
var cmds = {}
var fs = require('fs');
var ArgumentParser = require("argparse").ArgumentParser;
var parser = new ArgumentParser({
  title: "Odyssey is a pluggable data migration tool"
});
var subparsers = parser.addSubparsers({
  title: "Odyssey subcommands"
});
var generators = fs.readdirSync(__dirname + "/generators");
generators.forEach(function (generator) {
  var key = generator.replace(".js", "");
  cmds[key] = require("./generators/" + key);
  cmds[key].register(subparsers);
});

function start(args){
  var options = parser.parseArgs(args);
  var cmd = args[0];
  if (cmds[cmd] && cmds[cmd].create) {
    cmds[cmd].create(options, fs, console);
  }
}

start(process.argv.splice(2));
exports.init = init;
