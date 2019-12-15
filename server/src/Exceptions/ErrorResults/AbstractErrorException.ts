import { Response } from 'express';

export abstract class AbstractErrorException {
    private response: Response | null;

    protected constructor(res: Response | null = null) {
        this.response = res;
    }

    public setResponse(res: Response): void {
        this.response = res;
    }

    public getResponse(): Response {
        if (this.response != null) {
            return this.response;
        } else {
            throw 'Abstract Error Exception: Response is null!';
        }
    }

    public abstract send(): void;
}
