import Joi, { SchemaMap, ValidationError } from "@hapi/joi";
import {IRegister} from "./RegisterValidator";

export interface IValidationInput {}

export interface IValidationResult {
    valid: boolean;
    error: Array<any>;
    value: IValidationInput
}

export abstract class AbstractValidator {
    protected abstract schema: SchemaMap;

    protected validateSchema = (data: IValidationInput): IValidationResult => {
        const {error, value}: { error: ValidationError, value: IRegister } = <any>Joi.validate(data, Joi.object().keys(this.schema), {abortEarly: false});

        const errors: string[] = [];
        if(error !== null) {
            error.details.map(({message}) => {
                errors.push(message);
            })
        }

        return {
            valid: errors.length === 0,
            error: errors,
            value,
        }
    };

    public abstract validate(data: IValidationInput): IValidationResult;
}
