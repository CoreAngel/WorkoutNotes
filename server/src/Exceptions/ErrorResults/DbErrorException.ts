import { Response } from 'express';
import { AbstractErrorException } from './AbstractErrorException';

export class DbErrorException extends AbstractErrorException {
    constructor(res: Response | null = null) {
        super(res);
    }

    public send = (): void => {
        this.getResponse()
            .status(500)
            .send({
                message: 'DB error'
            })
            .end();
    };
}
