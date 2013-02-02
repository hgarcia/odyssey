var should = require("should");
var sinon = require("sinon");
var generators = require("../bin/engines/generators");
var cnsMock = {
  content: "",
  log: function (txt) {
    this.content += txt;
  }
};

describe("generators", function() {

  describe(".init(['new', 'first-migration'])", function () {
    it("should create a new migration file", function () {
      var args = ["new", "first-migration"];
      // var fsMock = sinon;
      cnsMock.content = "";
      generators.init(args, fsMock, cnsMock)
    });
  });

});
