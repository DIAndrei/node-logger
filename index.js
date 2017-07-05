'use strict';

/**
 * Old method. Everything in just one file. This file is "deprecated".
 */

const fs = require('fs');
const request = require('request');

/**
 * Constructor for ConsoleEngine. This will be used to write logs and errors to the console.
 */
function ConsoleEngine() { }


ConsoleEngine.prototype.write = function () {
    console.log.apply(console, arguments);
}


ConsoleEngine.prototype.error = function () {
    console.error.apply(console, arguments);
}

/**
 * Constructor for FileEngine. This will be used to write logs and errors in files.
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
 * Constructor for HttpEngine. This will be used to send log and error messages to a remote server.
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
 * Constructor for the Logger. You must provide an log engine object as an argument.
 * @param {Type of an engine to be used} logEngine 
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
