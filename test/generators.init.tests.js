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
  });

  afterEach(function () {
    fs.mkdirSync.restore();
    cnsMock.content = "";
  });

  describe("With default args", function () {
    it("should create the default environment", function () {
      init.create({folder: "mig"}, fs, cnsMock);
      fs.mkdirSync.calledOnce.should.be.ok;
      fs.mkdirSync.args[0][0].should.include("/mig");
      cnsMock.content.should.include("Creating migration folder:");
      cnsMock.content.should.include("Done");
    });

    it("should create the default environment with milestones", function () {
      init.create({folder: "mig", milestones: 'yes', firstMilestone: 'm1'}, fs, cnsMock);
      fs.mkdirSync.calledTwice.should.be.ok;
      fs.mkdirSync.args[0][0].should.include("/mig");
      fs.mkdirSync.args[1][0].should.include("/mig/m1");
      cnsMock.content.should.include("Creating migration folder:");
      cnsMock.content.should.include("Creating milestones folder:");
      cnsMock.content.should.include("Done");
    });
  });
});