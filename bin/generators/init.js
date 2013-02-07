"use strict";

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
    [ '-d', '--driver' ],
    {
      defaultValue: 'mongo',
      help: 'What db driver will be used (default mongoDb)'
    }
  );
  parser.addArgument(
    [ '-s', '--secondaryDriver' ],
    {
      defaultValue: 'mongo',
      help: 'What db driver will be  for the secondary db (default mongoDb)'
    }
  );
}

/*
Should ask for driver and try to install from npm (default mongo)
Should ask if milestones are going to be used (default yes)
Should ask for first milestone (default v1)
Should write configuration down to disk.
*/
function create (args, fs, console, migrator) {
  console.log(args);
  // var tplPath =  __dirname + '/../templates/migration.tpl.js';
  // var filePath = getMigrationPath(name, migrator);
  // var template = fs.readFileSync(tplPath, 'utf8');
  // console.log('Generating: ' + filePath);
  // fs.writeFileSync(filePath, template);
  // console.log('Done');
};

exports.create = create;
exports.register = register;
