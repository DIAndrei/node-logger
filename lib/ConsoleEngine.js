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

module.exports = new ConsoleEngine();