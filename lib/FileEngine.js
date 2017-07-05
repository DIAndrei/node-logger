const fs = require('fs');

/**
 * 
 */
function FileEngine() { }

FileEngine.prototype.write = function () {
    var args = Array.prototype.slice.call(arguments),
        message = args.join();
    

    fs.appendFile('./log/logger.log', message + '\r\n', function (err) {
        if (err) {
            return console.error(err);
        }
    });
}

FileEngine.prototype.error = function () {
    var args = Array.prototype.slice.call(arguments),
        message = args.join();
    fs.appendFile('./log/logger.error', message + '\r\n', function (err) {
        if (err) {
            return console.error(err);
        }
    });
}

module.exports = new FileEngine();
