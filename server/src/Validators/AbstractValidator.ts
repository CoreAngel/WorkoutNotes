import Joi, { SchemaMap, ValidationError } from '@hapi/joi';

export type ValidationInput = object;

export interface ValidationResult {
    valid: boolean;
    error: Array<string>;
    value: ValidationInput;
}

export abstract class AbstractValidator {
    protected abstract schema: SchemaMap;

    protected validateSchema = (data: ValidationInput): ValidationResult => {
        const {
            error,
            value
        }: { error: ValidationError; value: ValidationInput } = Joi.validate(
            data,
            Joi.object().keys(this.schema),
            {
                abortEarly: false
            }
        );

        const errors: string[] = [];
        if (error !== null) {
            error.details.map(({ message }) => {
                errors.push(message);
            });
        }

        return {
            valid: errors.length === 0,
            error: errors,
            value
        };
    };

    public abstract validate(data: ValidationInput): ValidationResult;

    public static testSchema = (
        data: ValidationInput,
        schema: SchemaMap
    ): ValidationResult => {
        const {
            error,
            value
        }: {
            error: ValidationError;
            value: ValidationInput;
        } = Joi.validate(data, Joi.object().keys(schema), {
            abortEarly: false
        });

        const errors: string[] = [];
        if (error !== null) {
            error.details.map(({ message }) => {
                errors.push(message);
            });
        }

        return {
            valid: errors.length === 0,
            error: errors,
            value
        };
    };
}
