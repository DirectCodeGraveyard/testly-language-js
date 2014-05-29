# Testly for NodeJS [![Build Status](https://travis-ci.org/testly/lang-node.svg?branch=master)](https://travis-ci.org/testly/lang-node)
Testly is an agile and polyglot testing framework. This is the NodeJS implementation.

[![NPM](https://nodei.co/npm/testly.png?downloads=true&stars=true)](https://nodei.co/npm/testly/)

## Usage
Here is a basic example:

```javascript
module.exports = function (suite) {
    var i = 0;

    suite.name("Basic");

    suite.init(function () {
        i++;
    });

    suite.define("Passing Test", function (test) {
        test.assert(i == 1);
    });

    suite.define("Failing Test", function (test) {
        test.shouldFail(function () {
            test.fail();
        });
    });

    suite.define("Assertion Test", function (test) {
        test.assert(5 == 5);
        test.assert("Hello" == "Hello");
        test.assert("Go" != "No");
        test.assert("LOL".toLowerCase() == "lol");
    });
};
```

## Bugs
Please file any bugs on the GitHub Issue Tracker.
