import { Response } from 'express';
import { AbstractErrorException } from './AbstractErrorException';

export class LoginErrorExecption extends AbstractErrorException {
    constructor(res: Response | null = null) {
        super(res);
    }

    public send = (): void => {
        this.getResponse()
            .status(401)
            .send({
                message: 'Incorrect login or password!'
            })
            .end();
    };
}
