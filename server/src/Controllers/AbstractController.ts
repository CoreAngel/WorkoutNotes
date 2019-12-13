export enum RespondStatus {
    ERROR = 'Error',
    OK = 'Ok'
}

export enum RespondErrorType {
    VALIDATION = 'Validation',
    SERVER = 'Server'
}

export type ReturnErrorType = {
    status: RespondStatus;
    type: RespondErrorType;
    body: object;
};

export type ReturnOKType = {
    status: RespondStatus;
    body: object;
};

export abstract class AbstractController {
    protected sendOK = (body: object): ReturnOKType => {
        return {
            status: RespondStatus.OK,
            body: body
        };
    };

    protected sendError = (
        type: RespondErrorType,
        body: object
    ): ReturnErrorType => {
        return {
            status: RespondStatus.ERROR,
            type,
            body
        };
    };

    protected sendErrorServer = (body: object): ReturnErrorType => {
        return this.sendError(RespondErrorType.SERVER, body);
    };

    protected sendErrorValidation = (body: object): ReturnErrorType => {
        return this.sendError(RespondErrorType.VALIDATION, body);
    };
}
