#!/usr/bin/env node
var fs = require("fs-utils");

var yargs = require('yargs')
   .usage("Run your tests like there is no tomorrow.\nUsage: testly [options]")
   .example("testly --testdir tests/ --json", "Run the tests in tests/ and output a JSON report to report.json")
   .default("testdir", "tests/")
   .default("json", false)
   .describe("testdir", "Directory to find Tests")
   .alias("d", "testdir")
   .alias("h", "help")
   .describe("help", "Prints this Help Message")
   .describe("debug", "Enables Debugging");

var argv = yargs.argv;

var debug = argv.debug;

if (argv.help) {
    yargs.showHelp();
    return;
}

console.debug = function (message) {
    if (debug)
        console.log("[Debugging] " + message);
};

var path = require("path");
require("colors");

var nodefs = require("fs");

if (!fs.exists(argv.testdir) || !fs.isDir(argv.testdir)) {
    console.error("ERROR".red + ": The directory '" + argv.testdir + "' does not exist or is not a directory!");
    return;
}

var listener = function (event) {
    if (event.type === "passed") {
        console.log("\u2713".green + " " + event.suiteName + " -> " + event.testName);
    } else if (event.type == "failed") {
        var err = event.err;
        console.log("\u2717".red + " " + event.suiteName + " -> " + event.testName + " (" + err.message + ")");
    }
};

var tests = [];

nodefs.readdirSync(argv.testdir).forEach(function (it) {
    tests.push(path.resolve(argv.testdir, it));
});

var testly = require("./testly/run.js")({
    tests: tests,
    listeners: [listener]
});

var results = testly.run();

if (argv.json) {
    console.log("Creating JSON Report".blue);
    fs.writeJSON(typeof argv.json != "boolean" ? argv.json : "report.json", results, {indention: 4});
    console.debug("JSON Report Created".blue);
}
