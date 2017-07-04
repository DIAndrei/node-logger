'use strict';

const fs = require('fs');


function ConsoleEngine() { }

ConsoleEngine.prototype.write = function (timestamp, message) {
    console.log(timestamp, message);
}

ConsoleEngine.prototype.error = function (timestamp, message) {
    console.error(timestamp, message);
}

function FileEngine() { }

FileEngine.prototype.write = function (timestamp, message) {
    fs.appendFile('./log/logger.log', timestamp + ' ' + message + '\r\n', function (err) {
        if (err) {
            return console.log(err);
        }
    });
}

FileEngine.prototype.error = function (timestamp, message) {
    fs.appendFile('./log/logger.error', timestamp + ' ' + message + '\r\n', function (err) {
        if (err) {
            return console.log(err);
        }
    });
}

function HttpEngine() {}

HttpEngine.prototype.write = function (timestamp, message) {}

HttpEngine.prototype.error = function (timestamp, message) {}


function Logger(logEngine) {
    this.logEngine = logEngine;
}

Logger.prototype.write = function (message) {
    var date = new Date();
    this.logEngine.write(date.toString(), message);
}

Logger.prototype.error = function (message) {
    var date = new Date();
    this.logEngine.error(date.toString(), message);
}

var consoleEngine = new ConsoleEngine(),
    consoleLog = new Logger(consoleEngine),
    fileEngine = new FileEngine(),
    fileLog = new Logger(fileEngine);

consoleLog.write('akjdhaskjdhkasjdASDASD');
consoleLog.error('RSOIRHIHDFKLHDFGJDHFGKHJ');

fileLog.write('teastslaksjdks');