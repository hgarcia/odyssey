#!/usr/bin/env node

var argParse = require("argparse");
var ejs = require('ejs');

function getTemplate (values, partialTplName) {
    var templatePath = __dirname +'/../templates/' + partialTplName + '.tpl.js';
    var template = fs.readFileSync(templatePath, 'utf8');
    return ejs.render(template, {locals: values});
}

function init (args) {
    var migration = Formatter.reportDate(new Date());
    var lastMigration = migrator.getLastMigration();
    var migrationPath = migrator.getMigrationsPath();

    var lexiconValues = getLexiconValues(args);
    var template = getTemplate(lexiconValues);
    var name = 'lexicon_migration_' + lexiconValues.key;

    var fileName = migrationPath + '/';

    if (migration > lastMigration) {
        fileName += migration + '-01_';
    } else {
        var version = lastMigration.substr(lastMigration.lastIndexOf('-') + 1, 2);
        version = (parseInt(version, 10) + 1);
        if (version < 10) {
            version = '0' + version;
        }
        fileName += migration + '-' + version + '_';
    }

    fileName += name + '.js';
    console.log('Generating: ' + fileName);
    fs.writeFileSync(fileName, template);
};

exports.init = init;

// var fsHelper = require('../fs.helpers');
// var fs = require('fs');



function capitalize(text) {
    return (text.substring(0, 1).toUpperCase() + text.substring(1, text.length));
}

function getSingular(text) {
    return text.substring(0, text.length - 1);
}

function createModel(model) {
    var content = getTemplate({model: model}, 'model')
    fs.writeFileSync(modulePath + '/models/' + model + '.js', content, 'utf8');
}

function createModels() {
    if (parsed.models.forEach) {
        parsed.models.forEach(function (m) {
            createModel(m);
        });
    } else {
        createModel(parsed.models);
    }
}

function createHandler(model) {
    var singularModel = getSingular(model);
    var viewSuffix = (parsed.name === model) ? '' : ('-' + model);
    var mainRoute = '/';
    if (parsed.mainRoute !== parsed.name) {
        mainRoute = '/' + parsed.mainRoute + '/';
    }
    var content = getTemplate(
        {
            viewSuffix: viewSuffix,
            viewFolder: parsed.name,
            model: model,
            singularModel: singularModel,
            mainRoute: mainRoute
        },
        'handlers'
    );
    fs.writeFileSync(modulePath + '/' + model + '.handlers.js', content, 'utf8');
}

function createHandlers() {
    if (parsed.models.forEach) {
        parsed.models.forEach(function (m) {
            createHandler(m);
        });
    } else {
        createHandler(parsed.models);
    }
}

function createRoutes() {
    if (!parsed.models.forEach) {
        parsed.models = [parsed.models];
    }
    var mainRoute = '/';
    if (parsed.mainRoute !== parsed.name) {
        mainRoute = '/' + parsed.mainRoute + '/';
    }
    var content = getTemplate({models: parsed.models, mainRoute: mainRoute}, 'routes');
    fs.writeFileSync(modulePath + '/' + parsed.name + '.routes.js', content, 'utf8');
}

function createView(model) {
    var listName = 'list';
    var editName = 'edit';

    if (parsed.name !== model) {
        listName = 'list-' + model;
        editName = 'edit-' + model;
    }

    ejs.open = '[[';
    ejs.close = ']]';

    var list = getTemplate({model: model}, 'list');
    fs.writeFileSync(modulePath + '/views/' + listName + '.ejs', list, 'utf8');

    var edit = getTemplate({singular: getSingular(model)}, 'edit');
    fs.writeFileSync(modulePath + '/views/' + editName + '.ejs', edit, 'utf8');
}

function createViews() {
    if (parsed.models.forEach) {
        parsed.models.forEach(function (m) {
            createView(m);
        });
    } else {
        createView(parsed.models);
    }
}

function createLexicon(model) {
    var lexicon = require('./engines/lexicon');
    var singularModel = getSingular(model);
    lexicon.init([model + 'List', capitalize(model)]);
    lexicon.init(['new' + singularModel, 'New ' + singularModel]);
    lexicon.init(['edit' + singularModel, 'Edit ' + singularModel]);
}

function createLexicons() {
    if (parsed.models.forEach) {
        parsed.models.forEach(function (m) {
            createLexicon(m);
        });
    } else {
        createLexicon(parsed.models);
    }
}

function createMenu(model) {
    var menus = require('./engines/menus');
    var type = 'primary';
    var menuArgs = ['all', 'primary', '/' + parsed.mainRoute, parsed.name, parsed.ord];
    if (parsed.mainRoute !== parsed.name) {
        menuArgs = ['all', 'secondary', '/' + parsed.mainRoute, '/' + parsed.mainRoute +'/' + parsed.name , parsed.name, parsed.ord];
    }
    menus.init(menuArgs);
}

function createMenus() {
    if (parsed.models.forEach) {
        parsed.models.forEach(function (m) {
            createMenu(m);
        });
    } else {
        createMenu(parsed.models);
    }
}

function init() {
    var missingOptions = false;
    if (!parsed.name) {
        console.log("Please indicate the name of the module -n <module_name>");
        missingOptions = true;
    }
    if (!parsed.models) {
        console.log("Please indicate the name of the models -m <model_name1> -m <model_name2>");
        missingOptions = true;
    }
    if (!parsed.mainRoute) {
        console.log("Please indicate the main route (no slash) -r <main_route> ex: -r operations");
        missingOptions = true;
    }
    if (!parsed.ord) {
        console.log("Please indicate the order in the menu -o <order> ex: -o 200");
        missingOptions = true;
    }

    if (missingOptions) { return; }

    modulePath = modulePath + parsed.name;

    console.log('Creating the folder structure...');
    fsHelper.createDirs(modulePath + '/models');
    fsHelper.createDirs(modulePath + '/views');
    console.log('Creating route');
    createRoutes();
    console.log('Creating handlers');
    createHandlers();
    console.log('Creating models');
    createModels();
    console.log('Creating views');
    createViews();
    console.log('Creating lexicon');
    createLexicons();
    console.log('Creating menus');
    createMenus();
    console.log('Done');
};
