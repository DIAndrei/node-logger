'use strict';

const request = require('request');

/**
 * Constructor for HttpEngine. This will be used to send log and error messages to a remote server.
 */
function HttpEngine() { }

HttpEngine.prototype.sendData = (type, data) => {
    let dataToSend = {
        'type': type,
        'message': data
    };
    return new Promise((resolve, reject) => {
        request.post('https://jsonplaceholder.typicode.com/posts', { json: true, body: dataToSend }, (err, res, body) => {
            if (err) {
                return reject(err);
            }
            resolve(res.statusCode);
        });
    });
}

HttpEngine.prototype.write = (...args) => {
    HttpEngine.prototype.sendData('log', args)
        .then((status) => {
            console.log(status);
        })
        .catch((error) => {
            console.trace(error);
        });
}

HttpEngine.prototype.error = (...args) => {
    HttpEngine.prototype.sendData('error', args)
        .then((status) => {
            console.log(status);
        })
        .catch((error) => {
            console.trace(error);
        });
}

module.exports = new HttpEngine();
