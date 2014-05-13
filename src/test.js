/**
 * Test Utilities
 */
var AssertThat = function (actual) {
    this.is = function (expected) {
        if (actual != expected) {
            throw new Error("Expected '" + expected + "', but got '" + actual + "'");
        }
        return;
    };
    
    this.isNot = function (expected) {
        if (actual == expected) {
            throw new Error("Expected '" + expected + "', but got '" + actual + "'");
        }
        return this;
    };
    
    this.and = function () {};
    
    this.isLessThan = function (greatest) {
        if (!(actual < greatest)) {
            throw new Error("Expected '" + actual + "' to be less than '" + greatest + "'");
        }
    };
    
    this.isGreaterThan = function (least) {
        if (!(actual > least)) {
            throw new Error("Expected '" + actual + "' to be greater than '" + least + "'");
        }
    };
    
    this.doesContain = function (part) {
        if (actual.toString().indexOf(part) == -1) {
            throw new Error("Expected '" + actual + "' to contains '" + part + "'");
        }
    };
};

exports.fail = function () {
    throw new Error("Test Failed");
};

exports.that = function (val) {
    return new AssertThat(val);
};