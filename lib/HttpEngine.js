const request = require('request');

/**
 * 
 */
function HttpEngine() { }

HttpEngine.prototype.sendData = function (type, data) {
    var dataToSend = {
        'type': type,
        'message': data
    };
    
    request.post('https://jsonplaceholder.typicode.com/posts', { json: true, body: dataToSend }, function (err, res, body) {
        if (err) {
            return console.error('POST failed:', err);
        }
        console.log(res.statusCode);
    });
}

HttpEngine.prototype.write = function (data) {
    this.sendData('log', data);
}

HttpEngine.prototype.error = function (data) {
    this.sendData('error', data);
}

module.exports = new HttpEngine();