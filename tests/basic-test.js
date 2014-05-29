var test = require("./../src/lib.js").test;

module.exports = function (suite) {
    var i = 0;

    suite.name("Basic");

    suite.init(function () {
        i++;
    });

    suite.define("Passing Test", function () {
        test.assert(i == 1);
    });

    suite.define("Failing Test", function () {
        test.shouldFail(function () {
            test.fail();
        });
    });

    suite.define("Assertion Test", function () {
        test.assert(5 == 5);
        test.assert("Hello" == "Hello");
        test.assert("Go" != "No");
        test.assert("LOL".toLowerCase() == "lol");
    });
};