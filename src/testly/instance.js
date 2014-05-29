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
    
    console.debug("Starting Tests".yellow);

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
            var testFunc = tests[testName];
            try {
                console._log = console.log;
                console.log = function (input) {
                    if (this.caller == testFunc) {
                        executeEvent(listeners, {
                            type: "output",
                            testName: testName,
                            suiteName: suiteName,
                            line: input
                        });
                    } else {
                        console._log(input);
                    }
                };
                executeEvent(listeners, {
                    type: "run",
                    testName: testName,
                    suiteName: suiteName
                });
                testFunc();
            } catch (e) {
                console.log = console._log;
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
            console.log = console._log;
            executeEvent(listeners, {
                type: "passed",
                testName: testName,
                suiteName: suiteName
            });
            results.push({
                suiteName: suiteName,
                testName: testName,
                state: "passed"
            });
        });
    });
    
    console.debug("Completed Tests".yellow);
    
    return {
        tests: results
    };
};