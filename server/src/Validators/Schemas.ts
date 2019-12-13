import Joi, { StringSchema } from '@hapi/joi';

export const loginSchema = ((): StringSchema => {
    const min = 4;
    const max = 36;

    return Joi.string()
        .alphanum()
        .min(min)
        .max(max)
        .required()
        .error(errors => {
            errors.map(err => {
                switch (err.type) {
                    case 'string.alphanum':
                        err.message =
                            'Login can only contain a-z, A-Z, and 0-9!';
                        break;
                    case 'string.min':
                    case 'string.max':
                        err.message = `Login length must be between ${min} and ${max} characters!`;
                        break;
                    case 'any.required':
                        err.message = 'Login is required field!';
                        break;
                }
            });
            return errors;
        });
})();

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

export const passwordSchema = ((): StringSchema => {
    const min = 6;
    const max = 64;

    return Joi.string()
        .min(min)
        .max(max)
        .required()
        .error(errors => {
            errors.map(err => {
                switch (err.type) {
                    case 'string.min':
                    case 'string.max':
                        err.message = `Password length must be between ${min} and ${max} characters!`;
                        break;
                    case 'any.required':
                        err.message = 'Password is required field!';
                        break;
                }
            });
            return errors;
        });
})();

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
                    err.message =
                        'Password and confirm password field must be equal!';
                    break;
            }
        });
        return errors;
    });
