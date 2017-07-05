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

HttpEngine.prototype.write = function () {
    var args = Array.prototype.slice.call(arguments);
    this.sendData.apply(this, ['log', args]);
}

HttpEngine.prototype.error = function () {
    var args = Array.prototype.slice.call(arguments);
    this.sendData.apply(this, ['error', args]);
}

module.exports = new HttpEngine();
