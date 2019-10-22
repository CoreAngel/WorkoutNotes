import {describe, it} from 'mocha';
import {expect} from 'chai';
import {emailSchema} from '../../src/Validators/Schemas'
import {AbstractValidator} from '../../src/Validators/AbstractValidator'


describe('Email Validation', () => {

    it('Valid email', () => {
        const {valid, error} = AbstractValidator.testSchema({
            'email': 'testuser@test.com'
        }, {
            email: emailSchema
        });
        expect(valid).to.equal(true);
        expect(error).to.lengthOf(0);
    });

    it('Email is not string', () => {
        const {valid, error} = AbstractValidator.testSchema({
            'email': {}
        }, {
            email: emailSchema
        });
        expect(valid).to.equal(false);
        expect(error).to.length.above(0);
    });

    it('To less domain segment', () => {
        const {valid, error} = AbstractValidator.testSchema({
            'email': 'testuser@test.'
        }, {
            email: emailSchema
        });
        expect(valid).to.equal(false);
        expect(error).to.length.above(0);
    });

    it('Email field not exist', () => {
        const {valid, error} = AbstractValidator.testSchema({
        }, {
            email: emailSchema
        });
        expect(valid).to.equal(false);
        expect(error).to.length.above(0);
    });

    it('Email field is null', () => {
        const {valid, error} = AbstractValidator.testSchema({
            'email': null
        }, {
            email: emailSchema
        });
        expect(valid).to.equal(false);
        expect(error).to.length.above(0);
    });

    it('Email field is undefined', () => {
        const {valid, error} = AbstractValidator.testSchema({
            'email': undefined
        }, {
            email: emailSchema
        });
        expect(valid).to.equal(false);
        expect(error).to.length.above(0);
    });

});
