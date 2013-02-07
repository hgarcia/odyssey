"use strict";
var h = require("../helpers");

function register(subparsers) {
  var parser = subparsers.addParser('migration',
    {
      addHelp: true,
      help: 'Use this command to create a new migration'
    });
  parser.addArgument(
    [ '-n', '--name' ],
    {
      required: true,
      help: 'The name for the new migration'
    }
  );
}

function getMigrationPath(name, migrator) {
  var migrationDate = h.getYYYYMMDD();
  var version = "01";
  var lastMigration = migrator.getLastMigration();
  var path = migrator.getMigrationsPath();
  if (!(migrationDate > lastMigration.date)) {
    version = h.pad((parseInt(lastMigration.version, 10) + 1), 2, "0");
  }
  return path + '/' + migrationDate + '-' + version + '_' + h.toFileName(name) + '.js';
}

function create (args, fs, console, migrator) {
  var tplPath =  __dirname + '/../templates/migration.tpl.js';
  var filePath = getMigrationPath(args.name, migrator);
  var template = h.getTemplate({}, "migration", fs);
  //fs.readFileSync(tplPath, 'utf8');
  console.log('Generating: ' + filePath);
  fs.writeFileSync(filePath, template);
  console.log('Done');
};

exports.create = create;
exports.register = register;
