const Joi = require('@hapi/joi');

const validateSchema = (schema) => {
    return (data) => {
        const {error, value} = Joi.validate(data, schema, {abortEarly: false});

        const errors = [];
        if(error !== null) {
            error.details.map(({message}) => {
                errors.push(message);
            })
        }
        return {
            error: errors.length === 0 ? null : errors,
            value,
        }
    }
};

module.exports = validateSchema;
