import { Response } from 'express';
import { AbstractErrorException } from './AbstractErrorException';

export class ValidationErrorException extends AbstractErrorException {
    private errors: string[];

    constructor(errors: string[], res: Response | null = null) {
        super(res);
        this.errors = errors;
    }

    public send = (): void => {
        this.getResponse()
            .status(401)
            .send({
                errors: this.errors
            })
            .end();
    };
}
