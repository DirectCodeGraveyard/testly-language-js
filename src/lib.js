exports.newInstance = function (config) {
    return require("./testly/run.js")(config);    
};

exports["test"] = require("./test.js");