import { IEngine } from '../types/IEngine';

/**
 * Engine for writing to the console.
 * Uses standard console
 *
 * @author Andrei Diaconu
 */
export class ConsoleEngine implements IEngine {

    /**
     * Class constructor
     */
    constructor() { }

    /**
     * Write a log to the console
     */
    log(...args): void {
        console.log(args.join(', '));
    }

    /**
     * Write an error to the console
     */
    error(...args): void {
        console.log(args.join(', '));
    }
}
