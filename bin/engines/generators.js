#!/usr/bin/env node
var argParse = require("argparse");
var ejs = require('ejs');

function getTemplate (values, partialTplName) {
    var templatePath = __dirname +'/../templates/' + partialTplName + '.tpl.js';
    var template = fs.readFileSync(templatePath, 'utf8');
    return ejs.render(template, {locals: values});
}

function init (args, fs, console) {
    // var migration = Formatter.reportDate(new Date());
    // var lastMigration = migrator.getLastMigration();
    // var migrationPath = migrator.getMigrationsPath();

    // var lexiconValues = getLexiconValues(args);
    // var template = getTemplate(lexiconValues);
    // var name = 'lexicon_migration_' + lexiconValues.key;

    // var fileName = migrationPath + '/';

    // if (migration > lastMigration) {
    //     fileName += migration + '-01_';
    // } else {
    //     var version = lastMigration.substr(lastMigration.lastIndexOf('-') + 1, 2);
    //     version = (parseInt(version, 10) + 1);
    //     if (version < 10) {
    //         version = '0' + version;
    //     }
    //     fileName += migration + '-' + version + '_';
    // }

    // fileName += name + '.js';
    // console.log('Generating: ' + fileName);
    // fs.writeFileSync(fileName, template);
};

exports.init = init;

// var fsHelper = require('../fs.helpers');
// var fs = require('fs');




// function init() {
    // var missingOptions = false;
    // if (!parsed.name) {
    //     console.log("Please indicate the name of the module -n <module_name>");
    //     missingOptions = true;
    // }
    // if (!parsed.models) {
    //     console.log("Please indicate the name of the models -m <model_name1> -m <model_name2>");
    //     missingOptions = true;
    // }
    // if (!parsed.mainRoute) {
    //     console.log("Please indicate the main route (no slash) -r <main_route> ex: -r operations");
    //     missingOptions = true;
    // }
    // if (!parsed.ord) {
    //     console.log("Please indicate the order in the menu -o <order> ex: -o 200");
    //     missingOptions = true;
    // }

    // if (missingOptions) { return; }

    // console.log('Creating the folder structure...');
    // fsHelper.createDirs(modulePath + '/models');
    // fsHelper.createDirs(modulePath + '/views');
    // console.log('Creating route');
    // createRoutes();
    // console.log('Creating handlers');
    // createHandlers();
    // console.log('Creating models');
    // createModels();
    // console.log('Creating views');
    // createViews();
    // console.log('Creating lexicon');
    // createLexicons();
    // console.log('Creating menus');
    // createMenus();
    // console.log('Done');
// };
