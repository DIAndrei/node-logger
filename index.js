const consoleEngine = require('./lib/ConsoleEngine.js'),
    fileEngine = require('./lib/FileEngine.js'),
    httpEngine = require('./lib/HttpEngine.js'),
    Logger = require('./lib/Logger.js');

let consoleLog = new Logger(consoleEngine),
    fileLog = new Logger(fileEngine),
    httpLog = new Logger(httpEngine);

consoleLog.write('This is a console log', 'This is also a console log', 'You can provide multiple arguments for this');
consoleLog.error('This is a console error', 'This is also a console error', 'You can provide multiple arguments for this, too');

fileLog.write('This is a file log', 'This is also a file log', 'Everything will be written inside logger.log file');
fileLog.error('This is a file error', 'This is also a file error', 'Everything will be written inside logger.error file');

httpLog.write('This is an API post log', 'Blablabla');
