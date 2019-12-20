import { expect } from 'chai';
import { Secret } from '../../src/Utils/Secret';

describe('Secret', () => {
    it('It should generate 2 different string', () => {
        const secret1 = Secret.generate();
        const secret2 = Secret.generate();

        expect(secret1).to.be.not.empty;
        expect(secret2).to.be.not.empty;
        expect(secret1).to.be.not.equal(secret2);
    });
});
