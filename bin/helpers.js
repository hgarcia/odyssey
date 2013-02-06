var ejs = require('ejs');

function getTemplate (values, partialTplName, fs) {
  var templatePath = __dirname + '/templates/' + partialTplName + '.tpl.js';
  var template = fs.readFileSync(templatePath, 'utf8');
  return ejs.render(template, {locals: values});
}

function pad(value, size, padder) {
  var val = String(value), i = 0;
  var diff = size - val.length;
  for (i = 0; i < diff; (i += 1)) {
    val = padder + val;
  }
  return val;
}

function getYYYYMMDD() {
  var d = new Date();
  return d.getFullYear() + "-" + pad((d.getMonth() + 1), 2, "0") + "-" + pad(d.getDate(), 2, "0");
}

function toFileName(name) {
  return name.replace(/[^a-zA-Z]/ig, "_");
}

exports.pad = pad;
exports.toFileName = toFileName;
exports.getYYYYMMDD = getYYYYMMDD;
exports.getTemplate = getTemplate;
