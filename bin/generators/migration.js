#!/usr/bin/env node
var argParse = require("argparse");
var h = require("../helpers");

function getMigrationPath(name, migrator) {
  var migrationDate = h.getYYYYMMDD();
  var version = "01";
  var lastMigration = migrator.getLastMigration();
  var path = migrator.getMigrationsPath();
  if (!(migrationDate > lastMigration.date)) {
    version = h.pad((parseInt(lastMigration.version, 10) + 1), 2, "0");
  }
  return path + '/' + migrationDate + '-' + version + '_' + name + '.js';
}

function create (name, fs, console, migrator) {
  var tplPath =  __dirname + '/../templates/migration.tpl.js';
  var filePath = getMigrationPath(name, migrator);
  var template = fs.readFileSync(tplPath, 'utf8');
  console.log('Generating: ' + filePath);
  fs.writeFileSync(filePath, template);
  console.log('Done');
};

exports.create = create;
