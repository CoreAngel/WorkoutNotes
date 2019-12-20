import { createSandbox, SinonSandbox } from 'sinon';
import mock from 'node-mocks-http';
import { expect } from 'chai';
import { AuthController } from '../../src/Controllers/AuthController';
import { UserService } from '../../src/Services/UserService';
import { Register } from '../../src/Validators/RegisterValidator';

describe('Auth Controller', () => {
    describe('Register route', () => {
        let sandbox: SinonSandbox;

        before(() => {
            sandbox = createSandbox();
        });
        afterEach(() => {
            sandbox.restore();
        });

        it('It should create user', async () => {
            const body: Register = {
                login: 'user123',
                email: 'user123@gmail.com',
                password: '12341234',
                confirmPassword: '12341234'
            };
            const createUser = sandbox.stub(UserService, 'createUser');
            createUser.resolves('jwt_token');

            const req = mock.createRequest({ body });
            const res = mock.createResponse();

            const authController = new AuthController();
            await authController.register(req, res);
            const json = res._getData();

            expect(res.statusCode).to.equal(200);
            expect(json).to.haveOwnProperty('token');
            expect(json).to.haveOwnProperty('token').not.empty;
        });
    });
});
