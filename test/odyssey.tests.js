var should = require("should");
var odyssey = require('../index');

describe('odyssey', function() {

  describe('.create(options)', function () {
    it('should throw if no options passed', function (done) {
      try {
        var migrator = odyssey.create();
      } catch(e) {
        done();
      }
    });
  });

});
