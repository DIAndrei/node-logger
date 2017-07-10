'use strict';

/**
 * Old method. Everything in just one file. This file is "deprecated".
 */

const fs = require('fs'),
    request = require('request');

/**
 * Constructor for ConsoleEngine. This will be used to write logs and errors to the console.
 */
function ConsoleEngine() { }


ConsoleEngine.prototype.write = (...args) => {
    console.log(args.join(', '));
}


ConsoleEngine.prototype.error = (...args) => {
    console.error(args.join(', '));
}

/**
 * Constructor for FileEngine. This will be used to write logs and errors in files.
 */
function FileEngine() { }

FileEngine.prototype.write = (...args) => {
    fs.appendFile('./log/logger.log', args.join(', ') + '\r\n', (err) => {
        if (err) {
            return console.error(err);
        }
    });
}

FileEngine.prototype.error = (...args) => {
    fs.appendFile('./log/logger.error', args.join(', ') + '\r\n', (err) => {
        if (err) {
            return console.trace(err);
        }
    });
}

/**
 * Constructor for HttpEngine. This will be used to send log and error messages to a remote server.
 */
function HttpEngine() { }

HttpEngine.prototype.sendData = (type, data) => {
    let dataToSend = {
        'type': type,
        'message': data
    };

    request.post('https://jsonplaceholder.typicode.com/posts', { json: true, body: dataToSend }, (err, res, body) => {
        if (err) {
            return console.trace('POST failed:', err);
        }
        console.log(res.statusCode);
    });
}

HttpEngine.prototype.write = (...args) => {
    HttpEngine.prototype.sendData('log', args);
}

HttpEngine.prototype.error = (...args) => {
    HttpEngine.prototype.sendData('error', args); 
}


/**
 * Constructor for the Logger. You must provide an log engine object as an argument.
 * @param {Type of an engine to be used} logEngine 
 */
function Logger(logEngine) {
    this.logEngine = logEngine;
}

Logger.prototype.write = function (...args) {
    let date = new Date().toString();

    args.unshift(date);

    this.logEngine.write.apply(this.logEngine, args);
}

Logger.prototype.error = function (...args) {
    let date = new Date().toString();

    args.unshift(date);

    this.logEngine.error.apply(this.logEngine, args);
}

//----------------------------------------------------------------------

let consoleEngine = new ConsoleEngine(),
    consoleLog = new Logger(consoleEngine),
    fileEngine = new FileEngine(),
    fileLog = new Logger(fileEngine);

consoleLog.write('akjdhaskjdhkasjdASDASD', 'dsfre4e', 'asdSSSSSLAPSPSPS');
consoleLog.error('RSOIRHIHDFKLHDFGJDHFGKHJ', '39817lakjsdlkasd!@#', 22);
fileLog.write('teastslaksjdks', 'alsdijaosidja', 'skjdaka');
fileLog.error('alksdadklsj', 'DKSLDKFJDLSKFj', 94872);

// let httpEngine = new HttpEngine(),
//     httpLog = new Logger(httpEngine);


// httpLog.write('asdasdasd', 'AKLSDM');
