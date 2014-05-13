var shell = require('shelljs');

module.exports = function (grunt) {
    grunt.registerTask("test", function () {
        shell.exec("node src/main.js --testdir=tests/ --json=test-report.json");
    });
};