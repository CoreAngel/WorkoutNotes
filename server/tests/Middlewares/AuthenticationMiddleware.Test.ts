import { expect } from 'chai';
import { Response, Request } from 'express';
import mock, { MockRequest, MockResponse } from 'node-mocks-http';
import { fake, SinonSandbox, createSandbox, SinonSpy, SinonStub } from 'sinon';
import { authenticationMiddleware } from '../../src/Middlewares/AuthenticationMiddleware';
import { Token } from '../../src/Utils/Token';
import { UserService } from '../../src/Services/UserService';
import { UserModel } from '../../src/Models/UserModel';
import { AuthenticatedErrorException } from '../../src/Exceptions/ErrorResults/AuthenticatedErrorException';

describe('Authentication middleware', () => {
    let sandbox: SinonSandbox,
        res: MockResponse<Response>,
        req: MockRequest<Request>,
        next: SinonSpy,
        verify: SinonStub,
        getUserByAuth: SinonStub;

    before(() => {
        sandbox = createSandbox();
    });

    beforeEach(() => {
        next = fake();
        req = mock.createRequest({
            headers: {
                Authentication: 'token'
            }
        });
        res = mock.createResponse();
        verify = sandbox.stub(Token, 'verify');
        verify.resolves({
            id: '1',
            key: 'key',
            iat: 235
        });
        getUserByAuth = sandbox.stub(UserService, 'getUserByAuthentication');
        const user = new UserModel({
            login: 'user',
            password: 'pass',
            email: 'email@gmail.com',
            key: 'key'
        });
        user._id = '1';
        getUserByAuth.resolves(user);
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('It should authenticate user', async () => {
        await authenticationMiddleware(req, res, next);

        expect(req.headers['Authenticated-User']).to.not.be.undefined;
        expect(next.callCount).to.be.equal(1);
    });

    it(`It should throw authenticated error because req header doesn't exists`, async () => {
        const req = mock.createRequest();

        let error: object | null = null;
        try {
            await authenticationMiddleware(req, res, next);
        } catch (e) {
            error = e;
        }

        expect(error).to.be.instanceOf(AuthenticatedErrorException);
        expect(next.callCount).to.be.equal(0);
    });

    it(`It should throw authenticated error because incorrect token`, async () => {
        verify.resolves(null);

        let error: object | null = null;
        try {
            await authenticationMiddleware(req, res, next);
        } catch (e) {
            error = e;
        }

        expect(error).to.be.instanceOf(AuthenticatedErrorException);
        expect(next.callCount).to.be.equal(0);
    });

    it(`It should throw authenticated error because wrong user data`, async () => {
        getUserByAuth.resolves(null);

        let error: object | null = null;
        try {
            await authenticationMiddleware(req, res, next);
        } catch (e) {
            error = e;
        }

        expect(error).to.be.instanceOf(AuthenticatedErrorException);
        expect(next.callCount).to.be.equal(0);
    });
});
