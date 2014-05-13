var assert = require("assert");

module.exports = function (suite) {
    var i = 0;
    
    suite.name("Basic");
    
    suite.init(function () {
        i++;
    });
    
    suite.define("Passing Test", function () {
        assert.equal(i, 1, "Expected 1, but got " + i);
    });
};