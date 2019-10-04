import Joi from "@hapi/joi";

export const loginSchema = Joi.string()
    .alphanum()
    .min(4)
    .max(36)
    .required()
    .error(errors => {
        errors.map(err => {
            switch (err.type) {
                case 'string.alphanum':
                    err.message = 'Login can only contain a-z, A-Z, and 0-9!';
                    break;
                case 'string.min':
                case 'string.max':
                    err.message = 'Login length must be between 4 and 36 characters!';
                    break;
                case 'any.required':
                    err.message = 'Login is required field!';
                    break;
            }
        });
        return errors;
    });

export const emailSchema = Joi.string()
    .email({ minDomainSegments: 2 })
    .required()
    .error(errors => {
        errors.map(err => {
            switch (err.type) {
                case 'string.email':
                    err.message = 'Email is not valid email!';
                    break;
                case 'any.required':
                    err.message = 'Email is required field!';
                    break;
            }
        });
        return errors;
    });

export const passwordSchema = Joi.string()
    .min(6)
    .max(64)
    .required()
    .error(errors => {
        errors.map(err => {
            switch (err.type) {
                case 'string.min':
                case 'string.max':
                    err.message = 'Password length must be between 6 and 64 characters!';
                    break;
                case 'any.required':
                    err.message = 'Password is required field!';
                    break;
            }
        });
        return errors;
    });

export const confirmPasswordSchema = Joi.string()
    .required()
    .valid(Joi.ref('password'))
    .error(errors => {
        errors.map(err => {
            switch (err.type) {
                case 'any.required':
                    err.message = 'Confirm password is required field!';
                    break;
                case 'any.allowOnly':
                    err.message = 'Password and confirm password field must be equal!';
                    break;
            }
        });
        return errors;
    });
