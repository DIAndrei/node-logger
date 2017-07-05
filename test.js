const consoleEngine = require('./lib/ConsoleEngine.js');
const fileEngine = require('./lib/FileEngine.js');
const httpEngine = require('./lib/HttpEngine.js');
const Logger = require('./lib/Logger.js');

var consoleLog = new Logger(consoleEngine),
    fileLog = new Logger(fileEngine);

consoleLog.write('akjdhaskjdhkasjdASDASD', 'dsfre4e', 'asdSSSSSLAPSPSPS');
consoleLog.error('RSOIRHIHDFKLHDFGJDHFGKHJ', '39817lakjsdlkasd!@#', 22);

fileLog.write('teastslaksjdks', 'alsdijaosidja', 'skjdaka');
fileLog.error('alksdadklsj', 'DKSLDKFJDLSKFj', 94872);

//setTimeout(function () { consoleLog.write('asdasd', 23); }, 5000);

var httpLog = new Logger(httpEngine);


httpLog.write('asdasdasd', 'AKLSDM');
