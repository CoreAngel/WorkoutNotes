import { describe, it } from 'mocha';
import { expect } from 'chai';
import { loginSchema } from '../../src/Validators/Schemas';
import { AbstractValidator } from '../../src/Validators/AbstractValidator';

describe('Login Validation', () => {
    it('Valid login', () => {
        const { valid, error } = AbstractValidator.testSchema(
            {
                login: 'TestUser'
            },
            {
                login: loginSchema
            }
        );
        expect(valid).to.equal(true);
        expect(error).to.lengthOf(0);
    });

    it('Illegal characters', () => {
        const { valid, error } = AbstractValidator.testSchema(
            {
                login: '.sdgdfwer-='
            },
            {
                login: loginSchema
            }
        );
        expect(valid).to.equal(false);
        expect(error).to.length.above(0);
    });

    it('Login too short', () => {
        const { valid, error } = AbstractValidator.testSchema(
            {
                login: 'ben'
            },
            {
                login: loginSchema
            }
        );
        expect(valid).to.equal(false);
        expect(error).to.length.above(0);
    });

    it('Login is not string', () => {
        const { valid, error } = AbstractValidator.testSchema(
            {
                login: {}
            },
            {
                login: loginSchema
            }
        );
        expect(valid).to.equal(false);
        expect(error).to.length.above(0);
    });

    it('Login too long', () => {
        const { valid, error } = AbstractValidator.testSchema(
            {
                login: '9Ku5MGyqHCesSo4xhnVECryqhrTCbd4J8fst3ipN'
            },
            {
                login: loginSchema
            }
        );
        expect(valid).to.equal(false);
        expect(error).to.length.above(0);
    });

    it('Login too long', () => {
        const { valid, error } = AbstractValidator.testSchema(
            {
                login: '9Ku5MGyqHCesSo4xhnVECryqhrTCbd4J8fst3ipN'
            },
            {
                login: loginSchema
            }
        );
        expect(valid).to.equal(false);
        expect(error).to.length.above(0);
    });

    it('Login field not exist', () => {
        const { valid, error } = AbstractValidator.testSchema(
            {},
            {
                login: loginSchema
            }
        );
        expect(valid).to.equal(false);
        expect(error).to.length.above(0);
    });

    it('Login field null', () => {
        const { valid, error } = AbstractValidator.testSchema(
            {
                login: null
            },
            {
                login: loginSchema
            }
        );
        expect(valid).to.equal(false);
        expect(error).to.length.above(0);
    });

    it('Login field undefined', () => {
        const { valid, error } = AbstractValidator.testSchema(
            {
                login: undefined
            },
            {
                login: loginSchema
            }
        );
        expect(valid).to.equal(false);
        expect(error).to.length.above(0);
    });
});
