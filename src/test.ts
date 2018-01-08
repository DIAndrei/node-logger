import { LoggR, ConsoleEngine, FileEngine, HttpEngine } from './main';

let consoleEngine = new ConsoleEngine();
let fileEngine = new FileEngine('./log.txt', './error.txt');
let httpEngine = new HttpEngine('https://jsonplaceholder.typicode.com/posts');
let consoleLog = new LoggR(consoleEngine);
let fileLog = new LoggR(fileEngine);
let httpLog = new LoggR(httpEngine);

consoleLog.log('This is a console log',
    'This is also a console log',
    'You can provide multiple arguments for this');

consoleLog.error('This is a console error',
    'This is also a console error',
    'You can provide multiple arguments for this, too');

fileLog.log('This is a file log', 'This is also a file log');
fileLog.error('This is a file error', 'This is also a file error');

httpLog.log('This is an API post log', 'Blablabla');
httpLog.error('This is an API post log', 'Blablabla');
