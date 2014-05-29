module.exports = function (suite) {
    suite.name("API");
    
    suite.define("Suite Consistency", function (test) {
        test.assert(typeof suite.name === "function", "suite.name is not a function!");
        test.assert(typeof suite.define == "function", "suite.define is not a function!");
        test.assert(typeof suite.init == "function", "suite.init is not a function!");
    });
};