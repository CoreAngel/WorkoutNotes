import { Response } from 'express';
import { AbstractErrorException } from '../Exceptions/ErrorResults/AbstractErrorException';

export abstract class AbstractController {
    protected throwCustomErrors = (
        error: object | null | undefined,
        res: Response
    ): void => {
        if (error instanceof AbstractErrorException) {
            const e = error as AbstractErrorException;
            e.setResponse(res);
            throw e;
        } else {
            throw error;
        }
    };
}
