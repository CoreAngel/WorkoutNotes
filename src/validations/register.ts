import Joi, { SchemaMap } from '@hapi/joi';
import { loginSchema, emailSchema, passwordSchema, confirmPasswordSchema } from './schemas'

export interface IValidationData {}

export interface IRegister extends IValidationData {
    login: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface IValidationResult {
    valid: boolean;
    error: Array<any>;
    value: IRegister
}

export abstract class AbstractValidator {
    protected abstract schema: SchemaMap;

    protected validateSchema = (data: IValidationData): IValidationResult => {
        const {error, value} = <any>Joi.validate(data, Joi.object().keys(this.schema), {abortEarly: false});

        const errors: any = [];
        if(error !== null) {
            error.details.map(({message}: {message: string}) => {
                errors.push(message);
            })
        }
        return {
            valid: errors.length === 0,
            error: errors,
            value,
        }
    }
}

export class RegisterValidator extends AbstractValidator {

    schema: SchemaMap;

    constructor() {
        super();
        this.schema = {
            login: loginSchema,
            email: emailSchema,
            password: passwordSchema,
            confirmPassword: confirmPasswordSchema
        };
    }

    public validate = (data: IRegister): IValidationResult => {
        return this.validateSchema(data);
    }
}
