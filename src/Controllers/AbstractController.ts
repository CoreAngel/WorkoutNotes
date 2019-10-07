import {Router} from "express";

export enum RespondStatus {
    ERROR = 'Error',
    OK = 'Ok'
}

export enum RespondErrorType {
    VALIDATION = 'Validation',
    SERVER = 'Server'
}

export abstract class AbstractController {
    protected abstract path: string;
    public router: Router = Router();

    protected abstract initializeRoutes = ():void => {};
}
