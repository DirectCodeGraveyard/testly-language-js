var fs = require("fs-utils");

module.exports = function (config) {
    var Testly = require("./instance.js");
    var instance = new Testly(config);
    return instance;
};