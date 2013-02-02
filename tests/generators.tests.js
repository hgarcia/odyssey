var should = require("should");
var sinon = require("sinon");
var fs = require('fs');
var generators = require("../bin/engines/generators");
var cnsMock = {
  content: "",
  log: function (txt) {
    this.content += txt;
  }
};
// var fsMock = {
//   writeFileName: "",
//   writeContent: "",
//   writeEncoding: "",
//   readContents: {},
//   reset: function () {
//     this.writeFileName = "";
//     this.writeContent = "";
//     this.writeEncoding = "";
//     this.readContents = {};
//   },
//   writeFileSync: function (fileName, content, encoding) {
//     this.writeFileName = fileName;
//     this.writeContent = content;
//     this.writeEncoding = encoding;
//   },
//   readFileSync: function (fileName, encoding) {
//     return this.readContents[fileName];
//   }
// };

describe("generators", function() {

  beforeEach(function () {
    sinon.stub(fs, 'writeFileSync', function (fileName, content, encoding) { });
  });

  afterEach(function () {
    fs.writeFileSync.restore();
  });

  describe(".init(['new', 'first-migration'])", function () {
    it("should create a new migration file", function () {
      var args = ["new", "first-migration"];
      generators.init(args, fs, cnsMock);

    });
  });
});
