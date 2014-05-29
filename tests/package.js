var test = require("../src/lib.js").test;
var semver = require("semver");
var fs = require("fs-utils");

module.exports = function (suite) {
    suite.name("Package");
    
    var pkginfo;
    
    suite.init(function () {
        pkginfo = fs.readJSONSync("package.json");
    });
    
    suite.define("Ensure Version is Valid", function () {
        test.assert(semver.valid(pkginfo.version));
    });
};