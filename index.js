'use strict';

const fs = require('fs');
const request = require('request');

/**
 * 
 */
function ConsoleEngine() { }


ConsoleEngine.prototype.write = function () {
    console.log.apply(console, arguments);
}


ConsoleEngine.prototype.error = function () {
    console.error.apply(console, arguments);
}

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

    this.logEngine.write.apply(this.logEngine, args);
}

Logger.prototype.error = function () {
    var date = new Date().toString(),
        args = Array.prototype.slice.call(arguments);

    args.unshift(date);

    this.logEngine.error.apply(this.logEngine, args);
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

var httpEngine = new HttpEngine(),
    httpLog = new Logger(httpEngine);


httpLog.write('asdasdasd', 'AKLSDM');
