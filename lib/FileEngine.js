'use strict';

const fs = require('fs');

/**
 * Constructor for FileEngine. This will be used to write logs and errors in files.
 */
function FileEngine() { }

FileEngine.prototype.writeData = (filePath, data) => {
    return new Promise((resolve, reject) => {
        fs.appendFile(filePath, data, (err) => {
            if (err)
                return reject(err);

            resolve();
        });
    });
}

FileEngine.prototype.write = (...args) => {
    let content = args.join(', ') + '\r\n';
    FileEngine.prototype.writeData('./log/logger.log', content)
        .then(() => { })
        .catch((error) => {
            console.trace(error);
        });
}

FileEngine.prototype.error = (...args) => {
    let content = args.join(', ') + '\r\n';
    FileEngine.prototype.writeData('./log/logger.error', content)
        .then(() => { })
        .catch((error) => {
            console.trace(error);
        });
}

module.exports = new FileEngine();
