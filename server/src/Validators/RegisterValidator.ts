import { SchemaMap } from '@hapi/joi';
import { AbstractValidator, IValidationInput, IValidationResult } from './AbstractValidator';
import { loginSchema, emailSchema, passwordSchema, confirmPasswordSchema } from './Schemas'

export interface IRegister extends IValidationInput {
    login: string;
    email: string;
    password: string;
    confirmPassword: string;
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
