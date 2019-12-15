import { AbstractErrorException } from './ErrorResults/AbstractErrorException';

export class ErrorMessagingHandler {
    constructor() {
        process.on('unhandledRejection', error => {
            this.handleErrors(error);
        });

        process.on('uncaughtException', error => {
            this.handleErrors(error);
        });
    }

    private handleErrors = (error: object | null | undefined): void => {
        if (error instanceof AbstractErrorException) {
            const customError = error as AbstractErrorException;
            this.handleCustomErrors(customError);
        } else {
            this.handleDefaultErrors(error);
        }
    };

    private handleCustomErrors = (error: AbstractErrorException): void => {
        error.send();
    };

    private handleDefaultErrors = (error: object | null | undefined) => {
        console.log(error);
    };
}
