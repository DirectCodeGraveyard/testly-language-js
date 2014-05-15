/**
 * Test Utilities
 */
var AssertThat = function (actual) {
    this.is = function (expected) {
        if (actual != expected) {
            throw new Error("Expected '" + expected + "', but got '" + actual + "'");
        }
        return this;
    };
    
    this.isNot = function (expected) {
        if (actual == expected) {
            throw new Error("Expected '" + expected + "', but got '" + actual + "'");
        }
        return this;
    };
    
    this.and = function (b) {
        if (typeof b !== "undefined" && !(actual && b)) {
            throw new Error("Expected true, but got false");
        }
        return this;
    };
    
    this.isLessThan = function (greatest) {
        if (!(actual < greatest)) {
            throw new Error("Expected '" + actual + "' to be less than '" + greatest + "'");
        }
        return this;
    };
    
    this.isGreaterThan = function (least) {
        if (!(actual > least)) {
            throw new Error("Expected '" + actual + "' to be greater than '" + least + "'");
        }
        return this;
    };
    
    this.doesContain = function (part) {
        if (actual.toString().indexOf(part) == -1) {
            throw new Error("Expected '" + actual + "' to contains '" + part + "'");
        }
        return this;
    };
};

exports.fail = function () {
    throw new Error("Test Failed");
};

exports.that = function (val) {
    return new AssertThat(val);
};