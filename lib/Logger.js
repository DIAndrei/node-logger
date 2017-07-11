'use strict';

module.exports = Logger;

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
