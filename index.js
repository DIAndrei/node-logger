'use strict';

const fs = require('fs');
const request = require('request');

/**
 * 
 */
function ConsoleEngine() { }


ConsoleEngine.prototype.write = function () {
    //console.log(arguments);
    console.log.apply(this, arguments);
}


ConsoleEngine.prototype.error = function () {
    //console.error(arguments);
    console.error.apply(this, arguments);
}

/**
 * 
 */
function FileEngine() { }

FileEngine.prototype.write = function () {
    var args = Array.prototype.slice.call(arguments);
    fs.appendFile('./log/logger.log', args + '\r\n', function (err) {
        if (err) {
            return console.log(err);
        }
    });
}

FileEngine.prototype.error = function () {
    var args = Array.prototype.slice.call(arguments);
    fs.appendFile('./log/logger.error', args + '\r\n', function (err) {
        if (err) {
            return console.log(err);
        }
    });
}

/**
 * 
 */
function HttpEngine() { }

HttpEngine.prototype.sendData = function (type, timestamp, message) {
    var data = JSON.stringify({
        'type': type,
        'message': message,
        'timestamp': timestamp
    });

    request.post('https://jsonplaceholder.typicode.com/posts', { json: true, body: data }, function (err, res, body) {
        //check res.statusCode
    });
}

HttpEngine.prototype.write = function (timestamp, message) {
    this.sendData('log', timestamp, message);
}

HttpEngine.prototype.error = function (timestamp, message) {
    this.sendData('error', timestamp, message);
}


/**
 * 
 * @param {*} logEngine 
 */
function Logger(logEngine) {
    this.logEngine = logEngine;
}

Logger.prototype.write = function () {
    var date = new Date().toString(),
        args = Array.prototype.slice.call(arguments);

    this.logEngine.write(date, args);
}

Logger.prototype.error = function () {
    var date = new Date().toString(),
        args = Array.prototype.slice.call(arguments);

    this.logEngine.error(date, args);
}

//----------------------------------------------------------------------

var consoleEngine = new ConsoleEngine(),
    consoleLog = new Logger(consoleEngine),
    fileEngine = new FileEngine(),
    fileLog = new Logger(fileEngine);

consoleLog.write('akjdhaskjdhkasjdASDASD', 'dsfre4e', 'asdSSSSSLAPSPSPS');
consoleLog.error('RSOIRHIHDFKLHDFGJDHFGKHJ');
fileLog.write('teastslaksjdks', 'alsdijaosidja', 'skjdaka');
fileLog.error('alksdadklsj', 'DKSLDKFJDLSKFj', 94872);

//setTimeout(function () { consoleLog.write('asdasd', 23); }, 5000);
