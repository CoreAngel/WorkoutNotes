export enum RespondStatus {
    ERROR = 'Error',
    OK = 'Ok'
}

export enum RespondErrorType {
    VALIDATION = 'Validation',
    SERVER = 'Server'
}

export abstract class AbstractController {
    protected sendOK = (body: object) => {
        return {
            status: RespondStatus.OK,
            body: body
        }
    };

    protected sendError = (type: RespondErrorType, body: object) => {
        return {
            status: RespondStatus.ERROR,
            type,
            body
        }
    };

    protected sendErrorServer = (body: object) => {
        return this.sendError(RespondErrorType.SERVER, body);
    };

    protected sendErrorValidation = (body: object) => {
        return this.sendError(RespondErrorType.VALIDATION, body);
    };
}
