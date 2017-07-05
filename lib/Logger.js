module.exports = Logger;

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
