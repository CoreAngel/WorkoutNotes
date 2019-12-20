import { expect } from 'chai';
import { Crypto } from '../../src/Utils/Crypto';

describe('Crypto', () => {
    it('It should return salt', async () => {
        const salt = await Crypto.generateSalt();

        expect(salt).to.be.a('string');
        expect(salt).to.be.not.empty;
    });

    it('It should return hashed password', async () => {
        const planPass = 'pass1234';
        const hashed = await Crypto.hashPassword(planPass);

        expect(hashed).to.be.a('string');
        expect(hashed).to.be.not.empty;
    });

    it('Expect equality of passwords', async () => {
        const planPass = 'pass1234';
        const hashed = await Crypto.hashPassword(planPass);
        const status = await Crypto.comparePassword(planPass, hashed);

        expect(status).to.be.true;
    });

    it('Expect inequality of passwords', async () => {
        const planPass1 = 'pass1234';
        const planPass2 = 'pass';
        const hashed = await Crypto.hashPassword(planPass1);
        const status = await Crypto.comparePassword(planPass2, hashed);

        expect(status).to.be.false;
    });
});
