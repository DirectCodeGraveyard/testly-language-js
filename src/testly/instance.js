var fs = require("fs-utils");

var Testly = module.exports = function (config) {
    this.config = config || {};
};

var executeEvent = function (listeners, event) {
    listeners.forEach(function (listener) {
        listener(event);
    });
};

Testly.prototype.run = function () {
    var config = this.config || {};
    var testFiles = config.tests || [];
    var listeners = config.listeners || [];
    var testly = this;

    var results = [];

    testFiles.forEach(function (testFile) {
        var testSuite = require(testFile);

        var tests = {};

        var suiteName = testFile.substr(0, testFile.indexOf(".js"));

        var init = function () {};

        testSuite({
            define: function (name, test) {
                tests[name] = test;
            },
            init: function (func) {
                init = func;
            },
            name: function (val) {
                if (val) {
                    suiteName = val;
                } else {
                    return name;
                }
            }
        });

        init();

        Object.keys(tests).forEach(function (testName) {
            try {
                tests[testName]();
            } catch (e) {
                executeEvent(listeners, {
                    type: "failed",
                    testName: testName,
                    suiteName: suiteName,
                    err: e
                });
                results.push({
                    suiteName: suiteName,
                    testName: testName,
                    state: "failed",
                    err: e
                });
                return; // Return from the Function
            }
            executeEvent(listeners, {
                type: "passed",
                testName: testName,
                suiteName: suiteName
            });
            results.push({
                suiteName: suiteName,
                testName: testName,
                state: "failed"
            });
        });
    });
    return {
        tests: results
    };
};