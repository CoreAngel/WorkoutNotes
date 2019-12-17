import { Response } from 'express';
import { AbstractErrorException } from './AbstractErrorException';

export class AuthenticatedErrorException extends AbstractErrorException {
    constructor(res: Response | null = null) {
        super(res);
    }

    public send = (): void => {
        this.getResponse()
            .status(401)
            .send({
                message: 'Authentication failed'
            })
            .end();
    };
}
