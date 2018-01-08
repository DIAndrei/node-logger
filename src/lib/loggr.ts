import { IEngine } from './types/IEngine';

/**
 * Main logger class
 * @author Andrei Diaconu
 */
export class LoggR {
    private engine: IEngine;

    /**
     * Class constructor
     */
    constructor(engine: IEngine) {
        this.engine = engine;
    }

    /**
     * Write log method
     */
    log(...args): void {
        let date: string = new Date().toString();
        args.unshift(date);
        this.engine.log.apply(this.engine, args);
    }

    /**
     * Write error method
     */
    error(...args): void {
        let date: string = new Date().toString();
        args.unshift(date);
        this.engine.error.apply(this.engine, args);
    }
}
