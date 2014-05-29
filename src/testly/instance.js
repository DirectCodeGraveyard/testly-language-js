var Testly = module.exports = function (config) {
    this.config = config || {};
};

var executeEvent = function (listeners, event) {
    listeners.forEach(function (listener) {
        listener(event);
    });
};

/**
 * Test Utilities
 */
var fail = function () {
    throw new Error("Test Failed");
};

function getErrorObject() {
    return new Error();
}

function getCallerInfo() {
    var err = getErrorObject();
    var caller_line = err.stack.split("\n")[4];
    var clean = caller_line.slice(caller_line.indexOf("at ") + "Object.Assertion Test".length + 5, caller_line.length);
    clean = clean.substr(clean.lastIndexOf(".js") + 4);
    clean = clean.substr(0, clean.lastIndexOf(")"));
    var split = clean.split(":");
    var line = Number(split[0]);
    var column = Number(split[1]);
    return {
        line: line,
        column: column
    };
}

var assert = function (val, message) {
    var failmsg = message ? message : "Expected true, but got false";
    
    if (!val) {
        var info = getCallerInfo();
        throw new Error(failmsg + " (at line " + info.line + ", column " + info.column + ")");
    }
};

var shouldFail = function (test) {
    try {
        test();
    } catch (e) {
        return;
    }
    throw new Error("Expected Test to Fail!");
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
                executeEvent(listeners, {
                    type: "run",
                    testName: testName,
                    suiteName: suiteName
                });
                testFunc({
                    log: function (line) {
                        executeEvent(listeners, {
                            type: "output",
                            testName: testName,
                            suiteName: suiteName,
                            line: line
                        });
                    },
                    fail: fail,
                    shouldFail: shouldFail,
                    assert: assert
                });
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
                state: "passed"
            });
        });
    });
    
    console.debug("Completed Tests".yellow);
    
    return {
        tests: results
    };
};