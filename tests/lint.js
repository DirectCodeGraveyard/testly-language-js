var shell = require("shelljs");

var js = [
    "src/lib.js",
    "src/main.js",
    "src/testly/instance.js",
    "src/testly/run.js"
];

module.exports = function (suite) {
    suite.name("Lint");
    
    suite.define("JSHint", function (test) {
       shell.exec("node node_modules/jshint/bin/jshint " + js.join(" "));
    });
};