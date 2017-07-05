const fs = require('fs');

/**
 * 
 */
function FileEngine() { }

FileEngine.prototype.write = function (data) {
    fs.appendFile('./log/logger.log', data + '\r\n', function (err) {
        if (err) {
            return console.error(err);
        }
    });
}

FileEngine.prototype.error = function (data) {
    fs.appendFile('./log/logger.error', data + '\r\n', function (err) {
        if (err) {
            return console.error(err);
        }
    });
}

module.exports = new FileEngine();