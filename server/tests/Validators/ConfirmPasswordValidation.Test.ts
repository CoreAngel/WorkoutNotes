import { describe, it } from 'mocha';
import { expect } from 'chai';
import {
    passwordSchema,
    confirmPasswordSchema
} from '../../src/Validators/Schemas';
import { AbstractValidator } from '../../src/Validators/AbstractValidator';

describe('Login Validation', () => {
    it('Valid confirm password', () => {
        const { valid, error } = AbstractValidator.testSchema(
            {
                password: 'pass12341234',
                confirmPassword: 'pass12341234'
            },
            {
                password: passwordSchema,
                confirmPassword: confirmPasswordSchema
            }
        );
        expect(valid).to.equal(true);
        expect(error).to.lengthOf(0);
    });

    it('Confirm password is not string', () => {
        const { valid, error } = AbstractValidator.testSchema(
            {
                password: {}
            },
            {
                password: passwordSchema,
                confirmPassword: confirmPasswordSchema
            }
        );
        expect(valid).to.equal(false);
        expect(error).to.length.above(0);
    });

    it('Confirm password not exist', () => {
        const { valid, error } = AbstractValidator.testSchema(
            {
                password: 'pass12341234'
            },
            {
                password: passwordSchema,
                confirmPassword: confirmPasswordSchema
            }
        );
        expect(valid).to.equal(false);
        expect(error).to.length.above(0);
    });

    it('Confirm password is different then password', () => {
        const { valid, error } = AbstractValidator.testSchema(
            {
                password: 'pass12341234',
                confirmPassword: 'pass1234'
            },
            {
                password: passwordSchema,
                confirmPassword: confirmPasswordSchema
            }
        );
        expect(valid).to.equal(false);
        expect(error).to.length.above(0);
    });
});
