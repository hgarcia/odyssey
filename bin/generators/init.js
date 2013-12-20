"use strict";
var h = require('../helpers');

function register(subparsers) {
  var parser = subparsers.addParser('init',
    {
      addHelp: true,
      help: 'Use this command to create a new migration folder structure in a project with the proper configuration.'
    });
  parser.addArgument(
    [ '-f', '--folder' ],
    {
      defaultValue: 'migrations',
      help: 'The folder to create the migrations into (default migrations)'
    }
  );
  parser.addArgument(
    [ '-m', '--milestones' ],
    {
      options: ['yes', 'no'],
      defaultValue: 'yes',
      help: 'Indicate if you want to use milestones to group migrations (default yes)'
    }
  );
  parser.addArgument(
    [ '-v', '--firstMilestone' ],
    {
      defaultValue: 'm1',
      help: 'If using milestones indicate the first one'
    }
  );
  parser.addArgument(
    [ '-d', '--driver' ],
    {
      defaultValue: 'mongo',
      help: 'What db driver will be used (default mongo)'
    }
  );
  parser.addArgument(
    [ '-s', '--secondaryDriver' ],
    {
      defaultValue: 'mongo',
      help: 'What db driver will used be for the secondary db (default mongo)'
    }
  );
}

function createFolder(folders, fs, console) {
  var path = folders.join("/");
  fs.mkdirSync(path);
  console.log("Creating folder: ", path);
}

function createDriver(path, driver, fs, console, type) {
  var template = h.getTemplate({driver: driver}, "driver", fs);
  path.push(type + "Driver.js");
  fs.writeFileSync(path.join("/"), template);
  console.log('Generating primary driver');
}

function create (args, fs, console, migrator) {
  var folders = [process.cwd(), args.folder];
  try {
    createFolder(folders, fs, console);
    if (args.driver) {
      var toolsFolder = folders.concat(['tools']);
      createFolder(toolsFolder, fs, console);
      createDriver(toolsFolder, args.driver, fs, console, "primary");
    }
    if (args.milestones === 'yes') {
      folders.push(args.firstMilestone);
      createFolder(folders, fs, console);
    }
    console.log('Done');
  } catch (e) {
    console.log(e.message);
  }
};

exports.create = create;
exports.register = register;