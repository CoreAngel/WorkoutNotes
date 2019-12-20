import { expect } from 'chai';
import { Token } from '../../src/Utils/Token';

describe('Token', () => {
    it('It should create token', async () => {
        const token = await Token.generate('1', 'key');

        expect(token).to.be.a('string');
        expect(token).to.not.empty;
    });

    it('It should verify correct token', async () => {
        const token = await Token.generate('1', 'key');
        const result = await Token.verify(token);

        expect(result).to.haveOwnProperty('id').not.empty;
        expect(result).to.haveOwnProperty('key').not.empty;
        expect(result).to.haveOwnProperty('iat').not.undefined;
    });

    it('It should verify incorrect token', async () => {
        const token = await Token.generate('1', 'key');
        const modifiedToken = token.substr(0, token.length - 2);
        const result = await Token.verify(modifiedToken);

        expect(result).to.be.null;
    });
});
