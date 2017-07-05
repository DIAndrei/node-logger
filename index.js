'use strict';

const fs = require('fs');
const request = require('request');

/**
 * 
 */
function ConsoleEngine() { }


ConsoleEngine.prototype.write = function (data) {
    console.log.apply(this, data);
}


ConsoleEngine.prototype.error = function (data) {
    console.error.apply(this, data);
}

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

/**
 * 
 */
function HttpEngine() { }

HttpEngine.prototype.sendData = function (type, data) {
    var dataToSend = {
        "type": type,
        "message": data
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

    args.unshift(date);

    this.logEngine.write(args);
}

Logger.prototype.error = function () {
    var date = new Date().toString(),
        args = Array.prototype.slice.call(arguments);

    args.unshift(date);

    this.logEngine.error(args);
}

//----------------------------------------------------------------------

var consoleEngine = new ConsoleEngine(),
    consoleLog = new Logger(consoleEngine),
    fileEngine = new FileEngine(),
    fileLog = new Logger(fileEngine);

consoleLog.write('akjdhaskjdhkasjdASDASD', 'dsfre4e', 'asdSSSSSLAPSPSPS');
consoleLog.error('RSOIRHIHDFKLHDFGJDHFGKHJ', '39817lakjsdlkasd!@#', 22);
fileLog.write('teastslaksjdks', 'alsdijaosidja', 'skjdaka');
fileLog.error('alksdadklsj', 'DKSLDKFJDLSKFj', 94872);

//setTimeout(function () { consoleLog.write('asdasd', 23); }, 5000);

var httpEngine = new HttpEngine(),
    httpLog = new Logger(httpEngine);


httpLog.write('asdasdasd', 'AKLSDM');
