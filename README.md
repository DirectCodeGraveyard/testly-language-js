# Testly for JavaScript
Testly is an agile and polyglot testing framework. This is the NodeJS implementation.

## Usage
Here is a basic example:

```javascript
var test = require("testly").test;

module.exports = function (suite) {
    var i = 0;
    
    suite.name("Basic");
    
    suite.init(function () {
        i++;
    });
    
    suite.define("Passing Test", function () {
        test.that(i).is(1);
    });
    
    suite.define("Failing Test", function () {
        test.fail();
    });
    
    suite.define("Assertion Test", function() {
        test.that("5").isNot(5);
        test.that("Go").is("Go");
        test.that(5).is(5).and().isLessThan(6);
        test.that("Hello World").doesContain("Hello");
    });
};
```

## Bugs
Please file any bugs on the GitHub Issue Tracker.
