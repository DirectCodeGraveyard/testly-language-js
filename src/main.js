#!/usr/bin/env node
var fs = require("fs-utils");

var program = require("commander");
var path = require("path");
require("colors");

var nodefs = require("fs");

program
    .version("0.0.4")
    .option("--testdir", "Specifies a Test Directory")
    .option("--json", "Specifies the file to write a JSON report to");

var testdir = "tests";
var jsonReport;

program.on('--testdir', function (val) {
    testdir = val;
});

program.on('--json', function (val) {
    jsonReport = val || "report.json";
});

program.parse(process.argv);

var listener = function (event) {
    if (event.type == "passed") {
        console.log("[" + event.suiteName + "]" + "[" + event.testName + "] " + "Passed".green);
    } else if (event.type == "failed") {
        console.log("[" + event.testName + "] " + "Failed".red);
        console.log(event.err);
    }
};

var tests = [];

nodefs.readdirSync(testdir).forEach(function (it) {
    tests.push(path.resolve(testdir, it));
});

var testly = require("./testly/run.js")({
    tests: tests,
    listeners: [listener]
});

var results = testly.run();

if (typeof jsonReport !== "undefined") {
    console.log("Creating JSON Report".blue);
    fs.writeJSON(jsonReport, results, {indention: 4});
}
