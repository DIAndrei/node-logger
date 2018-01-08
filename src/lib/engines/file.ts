import * as fs from 'fs';
import { IEngine } from '../types/IEngine';

/**
 * Engine for writing to file
 * Uses Node.js File System appendFile
 *
 * @author Andrei Diaconu
 */
export class FileEngine implements IEngine {

    // file paths declaration
    private logPath: string;
    private errorPath: string;

    /**
     * Class constructor.
     * Sets the paths to the log and error files.
     * @param logPath Log file path
     * @param errorPath Error file path
     */
    constructor(logPath: string, errorPath?: string) {
        if (!logPath) {
            let errMsg: string = 'At least the file path to the log file needed!';
            console.trace(errMsg);
            throw new Error(errMsg);
        }
        this.logPath = logPath;
        if (errorPath) {
            this.errorPath = errorPath;
        } else {
            this.errorPath = logPath;
        }
    }

    /**
     * Write a log
     */
    log(...args): void {
        let content = args.join(', ') + '\r\n';
        this.write(this.logPath, content)
            .then(() => { })
            .catch((error) => {
                console.trace(error);
            });
    }

    /**
     * Write an error
     */
    error(...args): void {
        let content = args.join(', ') + '\r\n';
        this.write(this.errorPath, content)
            .then(() => { })
            .catch((error) => {
                console.trace(error);
            });
    }

    /**
     * Private method called for actual file write
     */
    private write(path, data): Promise<void> {
        return new Promise((resolve, reject) => {
            fs.appendFile(path, data, (err) => {
                if (err)
                    return reject(err);
                resolve();
            });
        });
    }

}
