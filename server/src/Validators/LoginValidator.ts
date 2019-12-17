import { SchemaMap } from '@hapi/joi';
import {
    AbstractValidator,
    ValidationInput,
    ValidationResult
} from './AbstractValidator';
import { loginSchema, passwordSchema } from './Schemas';

export interface Login extends ValidationInput {
    login: string;
    password: string;
}

export class LoginValidator extends AbstractValidator {
    schema: SchemaMap;

    constructor() {
        super();
        this.schema = {
            login: loginSchema,
            password: passwordSchema
        };
    }

    public validate = (data: Login): ValidationResult => {
        return this.validateSchema(data);
    };
}
