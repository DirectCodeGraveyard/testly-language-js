var shell = require('shelljs');

module.exports = function (grunt) {
    grunt.registerTask("test", function () {
        shell.exec("node src/main.js --testdir=tests/ --json=test-report.json");
    });
    
    grunt.registerTask("update", function () {
        shell.exec("npm update");
    });
    
    grunt.registerTask("publish", function () {
        shell.exec("npm publish"); 
    });
};