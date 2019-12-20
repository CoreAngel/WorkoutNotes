import { describe, it } from 'mocha';
import { expect } from 'chai';
import { passwordSchema } from '../../src/Validators/Schemas';
import { AbstractValidator } from '../../src/Validators/AbstractValidator';

describe('Login Validation', () => {
    it('Valid password', () => {
        const { valid, error } = AbstractValidator.testSchema(
            {
                password: 'pass12341234'
            },
            {
                password: passwordSchema
            }
        );
        expect(valid).to.equal(true);
        expect(error).to.lengthOf(0);
    });

    it('Password is not string', () => {
        const { valid, error } = AbstractValidator.testSchema(
            {
                password: {}
            },
            {
                password: passwordSchema
            }
        );
        expect(valid).to.equal(false);
        expect(error).to.length.above(0);
    });

    it('Password to short', () => {
        const { valid, error } = AbstractValidator.testSchema(
            {
                password: 'pass'
            },
            {
                password: passwordSchema
            }
        );
        expect(valid).to.equal(false);
        expect(error).to.length.above(0);
    });

    it('Password to long', () => {
        const { valid, error } = AbstractValidator.testSchema(
            {
                password:
                    '6gJup4eFuKgSkoLo5pHIBcjFBMSaxU16mBkNYCbPIG2zjAd0Q4pDZq3fF3YO9Ku5MGyqHCesSo4xhnVECryqhrTCbd4J8fst3ipNstPTKySOPBUzbi3NiI3rnysIgZD6nbb1QmtCgIyY'
            },
            {
                password: passwordSchema
            }
        );
        expect(valid).to.equal(false);
        expect(error).to.length.above(0);
    });

    it('Password field not exist', () => {
        const { valid, error } = AbstractValidator.testSchema(
            {},
            {
                password: passwordSchema
            }
        );
        expect(valid).to.equal(false);
        expect(error).to.length.above(0);
    });

    it('Password field is null', () => {
        const { valid, error } = AbstractValidator.testSchema(
            {
                password: null
            },
            {
                password: passwordSchema
            }
        );
        expect(valid).to.equal(false);
        expect(error).to.length.above(0);
    });

    it('Password field is undefined', () => {
        const { valid, error } = AbstractValidator.testSchema(
            {
                password: undefined
            },
            {
                password: passwordSchema
            }
        );
        expect(valid).to.equal(false);
        expect(error).to.length.above(0);
    });
});
