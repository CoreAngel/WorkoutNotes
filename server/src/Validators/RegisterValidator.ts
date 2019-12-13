import { SchemaMap } from '@hapi/joi';
import {
    AbstractValidator,
    ValidationInput,
    ValidationResult
} from './AbstractValidator';
import {
    loginSchema,
    emailSchema,
    passwordSchema,
    confirmPasswordSchema
} from './Schemas';

export interface Register extends ValidationInput {
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

    public validate = (data: Register): ValidationResult => {
        return this.validateSchema(data);
    };
}
