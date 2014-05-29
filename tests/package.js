var semver = require("semver");
var fs = require("fs-utils");

module.exports = function (suite) {
    suite.name("Package");
    
    var pkginfo;
    
    suite.init(function () {
        pkginfo = fs.readJSONSync("package.json");
    });
    
    suite.define("Verify Version", function (test) {
        test.assert(semver.valid(pkginfo.version));
    });
    
    suite.define("Verify Name", function (test) {
        test.assert(pkginfo.name == "testly");
    });
};