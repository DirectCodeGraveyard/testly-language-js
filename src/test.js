/**
 * Test Utilities
 */
exports.fail = function () {
    throw new Error("Test Failed");
};

function getErrorObject() {
    return new Error();
}

function getCallerInfo() {
    var err = getErrorObject();
    var caller_line = err.stack.split("\n")[4];
    var index = caller_line.indexOf("at ");
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

exports.assert = function (val, message) {
    var failmsg = message ? message : "Expected true, but got false";
    
    if (!val) {
        var info = getCallerInfo();
        throw new Error(failmsg + " (at line " + info.line + ", column " + info.column + ")");
    }
};

exports.shouldFail = function (test) {
    try {
        test();
    } catch (e) {
        return;
    }
    throw new Error("Expected Test to Fail!");
};
