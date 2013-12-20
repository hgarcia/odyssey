var should = require("should");
var sinon = require("sinon");
var fs = require('fs');
var h = require("../bin/helpers");
var init = require("../bin/generators/init");
var cnsMock = {
  content: "",
  log: function (txt) {
    this.content += txt + "\n";
  }
};

describe("init.create(args, fs, console, migrator)", function() {

  beforeEach(function () {
    sinon.stub(fs, 'mkdirSync', function (path) { });
    sinon.stub(fs, 'writeFileSync', function (fileName, content, encoding) { });
  });

  afterEach(function () {
    fs.mkdirSync.restore();
    fs.writeFileSync.restore();
    cnsMock.content = "";
  });

  describe("With default args", function () {
    it("should create the default environment", function () {
      init.create({folder: "mig"}, fs, cnsMock);
      fs.mkdirSync.calledOnce.should.be.ok;
      fs.mkdirSync.args[0][0].should.include("/mig");
      cnsMock.content.should.equal("Creating folder: \nDone\n");
    });

    it("should create the tools folders", function () {
      init.create({folder: "mig", driver: 'mongo'}, fs, cnsMock);
      fs.mkdirSync.args[0][0].should.include("/mig");
      fs.mkdirSync.args[1][0].should.include("/tools");
      cnsMock.content.should.include("Creating folder: \nCreating folder: \n");
    });

    it("should create the mongo driver", function () {
      init.create({folder: "mig", driver: 'mongo'}, fs, cnsMock);
      fs.writeFileSync.calledOnce.should.be.ok;
      fs.writeFileSync.args[0][0].should.include("/mig/tools/primaryDriver.js");
      cnsMock.content.should.include("Generating primary driver\n");
    });

    it("should create the default environment with milestones", function () {
      init.create({folder: "mig", driver: 'mongo', milestones: 'yes', firstMilestone: 'm1'}, fs, cnsMock);
      fs.mkdirSync.args[0][0].should.include("/mig");
      fs.mkdirSync.args[1][0].should.include("/mig/tools");
      fs.mkdirSync.args[2][0].should.include("/mig/m1");
    });
  });
});