var should = require("should");
var sinon = require("sinon");
var fs = require('fs');
var h = require("../bin/helpers");
var migration = require("../bin/generators/migration");
var cnsMock = {
  content: "",
  log: function (txt) {
    this.content += txt + "\n";
  }
};
var migratorMock = {
  getLastMigration: function () {
    return {date: "", version: ""};
  },
  getMigrationsPath: function () {
    return "../db";
  }
};

describe("migration.create(migrationName)", function() {

  beforeEach(function () {
    sinon.stub(fs, 'writeFileSync', function (fileName, content, encoding) { });
  });

  afterEach(function () {
    fs.writeFileSync.restore();
    cnsMock.content = "";
  });

  describe("When there are no migration for the date", function () {
    it("should create a new migration file with version 01", function () {
      migration.create("first-migration", fs, cnsMock, migratorMock);
      fs.writeFileSync.calledOnce.should.be.ok;
      fs.writeFileSync.args[0][0].should.eql("../db/" + h.getYYYYMMDD() + "-01_first-migration.js");
      cnsMock.content.should.eql("Generating: ../db/" + h.getYYYYMMDD() + "-01_first-migration.js\nDone\n");
    });
  });

  describe("When there are four migrations for the date", function () {
    it("should create a new migration file with version 05", function () {
      migratorMock.getLastMigration = function () {
        return {date: h.getYYYYMMDD(), version: "04"}
      };
      migration.create("first-migration", fs, cnsMock, migratorMock);
      fs.writeFileSync.calledOnce.should.be.ok;
      fs.writeFileSync.args[0][0].should.eql("../db/" + h.getYYYYMMDD() + "-05_first-migration.js");
      fs.writeFileSync.args[0][1].should.include("up");
      cnsMock.content.should.eql("Generating: ../db/" + h.getYYYYMMDD() + "-05_first-migration.js\nDone\n");
    });
  });

});
