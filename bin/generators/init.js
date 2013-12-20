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
    [ '-v', '--firstMilestone' ],
    {
      defaultValue: 'm1',
      help: 'If using milestones indicate the first one'
    }
  );
  // parser.addArgument(
  //   [ '-d', '--driver' ],
  //   {
  //     defaultValue: 'mongo',
  //     help: 'What db driver will be used (default mongo)'
  //   }
  // );
  // parser.addArgument(
  //   [ '-s', '--secondaryDriver' ],
  //   {
  //     defaultValue: 'mongo',
  //     help: 'What db driver will used be for the secondary db (default mongo)'
  //   }
  // );
}

function create (args, fs, console, migrator) {
  var execPath = process.cwd();
  var folder = execPath + "/" + args.folder;
  try {
    fs.mkdirSync(folder);
    console.log('Creating migration folder: ' + folder);

    if (args.milestones === 'yes') {
      var milestonesFolder = folder + "/" + args.firstMilestone;
      fs.mkdirSync(milestonesFolder);
      console.log('Creating milestones folder: ' + milestonesFolder);
    }
    console.log('Done');
  } catch (e) {
    console.log(e.message);
  }
};

exports.create = create;
exports.register = register;