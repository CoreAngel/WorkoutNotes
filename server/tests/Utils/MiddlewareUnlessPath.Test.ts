import mock from 'node-mocks-http';
import { fake, SinonSandbox, createSandbox } from 'sinon';
import { expect } from 'chai';
import { middlewareUnlessPath } from '../../src/Utils/MiddlewareUnlessPath';

describe('MiddlewareUnlessPath', () => {
    let sandbox: SinonSandbox;
    const res = mock.createResponse();
    const req = mock.createRequest({
        path: '/auth/login'
    });

    before(() => {
        sandbox = createSandbox();
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('It should execute middleware because exclude paths is empty', async () => {
        const fakeMiddleware = fake();
        const next = fake();

        const middleware = middlewareUnlessPath(fakeMiddleware, []);
        middleware(req, res, next);

        expect(fakeMiddleware.callCount).to.equal(1);
        expect(next.callCount).to.equal(0);
    });

    it('It should execute middleware because exclude path is part of req path', async () => {
        const fakeMiddleware = fake();
        const next = fake();

        const middleware = middlewareUnlessPath(fakeMiddleware, ['/auth']);
        middleware(req, res, next);

        expect(fakeMiddleware.callCount).to.equal(1);
        expect(next.callCount).to.equal(0);
    });

    it('It should execute next function', async () => {
        const fakeMiddleware = fake();
        const next = fake();

        const middleware = middlewareUnlessPath(fakeMiddleware, [
            '/auth/login'
        ]);
        middleware(req, res, next);

        expect(fakeMiddleware.callCount).to.equal(0);
        expect(next.callCount).to.equal(1);
    });
});
