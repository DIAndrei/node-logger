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

module.exports = new ConsoleEngine();
