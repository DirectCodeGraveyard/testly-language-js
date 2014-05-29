var shell = require('shelljs');
var semver = require("semver");

module.exports = function (grunt) {
    grunt.registerTask("run-tests", function () {
        shell.exec("node src/main.js --testdir=tests/ --json=test-report.json");
    });
    
    grunt.registerTask("test", [ "check-version", "run-tests" ]);

    grunt.registerTask("update", function () {
        shell.exec("npm update");
    });

    grunt.registerTask("publish", [ "update-version" ], function () {
        shell.exec("npm publish");
    });
    
    grunt.registerTask("check-version", function () {
        var pkginfo = grunt.file.readJSON("package.json");
        if (!semver.valid(pkginfo.version)) {
            grunt.log.error("Specified Version '" + pkginfo.version + "' is not valid.");
            return false;
        }
    });
    
    grunt.registerTask("update-version", function () {
        var pkginfo = grunt.file.readJSON("package.json");
        var current = pkginfo.version;
        var next = semver.inc(current, "patch");
        grunt.log.write("Updating Version to v" + next);
        pkginfo.version = next;
        grunt.file.write("package.json", JSON.stringify(pkginfo, null, 4));
    });
};
