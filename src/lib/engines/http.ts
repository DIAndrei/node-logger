import * as request from 'request';

export class HttpEngine {

    // api endpoints declaration
    private logApiUrl: string;
    private errorApiUrl: string;

    /**
     * Class constructor
     * Sets the API endpoints
     * @param logApiUrl Log API endpoint URL
     * @param errorApiUrl Error API endpoint URL
     */
    constructor(logApiUrl: string, errorApiUrl?: string) {
        if (!logApiUrl) {
            let errMsg: string = 'At least the API URL to the log endpoint needed!';
            console.trace(errMsg);
            throw new Error(errMsg);
        }
        this.logApiUrl = logApiUrl;
        if (errorApiUrl) {
            this.errorApiUrl = errorApiUrl;
        } else {
            this.errorApiUrl = logApiUrl;
        }
    }

    /**
     * Write a log
     */
    log(...args) {
        this.send(this.logApiUrl, 'log', args)
            .then((status) => {
                console.log(status);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    /**
     * Write an error
     */
    error(...args) {
        this.send(this.errorApiUrl, 'error', args)
            .then((status) => {
                console.log(status);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    /**
     * Private method called to make the actual API request
     */
    private send(apiUrl: string, type: string, data: string[]): Promise<string> {
        let dataToSend = {
            'type': type,
            'message': data
        };
        return new Promise((resolve, reject) => {
            request.post(apiUrl,
                { json: true, body: dataToSend },
                (err, res) => {
                    if (err) {
                        return reject('HTTP request error: ' + err.statusCode);
                    }
                    resolve('HTTP request success: ' + res.statusCode);
                });
        });
    }

}
