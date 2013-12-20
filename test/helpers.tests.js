var should = require("should");
var sinon = require("sinon");
var fs = require('fs');
var helpers = require("../bin/helpers");

describe("helpers", function () {

  describe("#pad", function () {
    it("should add the padder character as many times is needed to get the length", function () {
      var result = helpers.pad("ab", 8, "z");
      result.should.equal("zzzzzzab");
    });
    it("should add no characters if str is same as length", function () {
      var result = helpers.pad("absolute", 8, "z");
      result.should.equal("absolute");
    });
    it("should add no characters if str is longer than length", function () {
      var result = helpers.pad("absolute", 4, "z");
      result.should.equal("absolute");
    });
  });

  describe("#getTemplate", function () {
    beforeEach(function () {
      sinon.stub(fs, 'readFileSync').returns("Lots of characters in <%= locals.here %>");
    });

    afterEach(function () {
      fs.readFileSync.restore();
    });

    it("should read the template from disk", function () {
      helpers.getTemplate({}, "tempName", fs);
      fs.readFileSync.calledOnce.should.be.ok;
      fs.readFileSync.args[0][0].should.include("/bin/templates/tempName.tpl.js");
    });

    it("should replace the tokens with the values", function () {
      var result = helpers.getTemplate({here: "this place"}, "tempName", fs);
      result.should.eql("Lots of characters in this place");
    });
  });

  describe("#getYYYYMMDD", function () {
    it("should return a string date formatted as YYYYMMDD", function () {
      var result = helpers.getYYYYMMDD();
      result.should.match(/\d\d\d\d-\d\d-\d\d/);
    });
  });

  describe("#toFileName", function () {
    it("should replace any non alphanumeric character with underscore", function () {
      var result = helpers.toFileName("This is +=()*&^");
      result.should.equal("This_is________");
    });
  });

});