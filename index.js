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

/**
 * Testing the engines
 */

let consoleEngine = new ConsoleEngine(),
    consoleLog = new Logger(consoleEngine),
    fileEngine = new FileEngine(),
    fileLog = new Logger(fileEngine);

consoleLog.write('akjdhaskjdhkasjdASDASD', 'dsfre4e', 'asdSSSSSLAPSPSPS');
consoleLog.error('RSOIRHIHDFKLHDFGJDHFGKHJ', '39817lakjsdlkasd!@#', 22);
fileLog.write('teastslaksjdks', 'alsdijaosidja', 'skjdaka');
fileLog.error('alksdadklsj', 'DKSLDKFJDLSKFj', 94872);

let httpEngine = new HttpEngine(),
    httpLog = new Logger(httpEngine);


httpLog.write('asdasdasd', 'AKLSDM');
