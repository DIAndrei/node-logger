'use strict';

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

module.exports = new ConsoleEngine();
