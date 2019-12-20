import { createSandbox, SinonSandbox } from 'sinon';
import mock from 'node-mocks-http';
import { expect } from 'chai';
import { AuthController } from '../../src/Controllers/AuthController';
import { UserService } from '../../src/Services/UserService';
import { Register } from '../../src/Validators/RegisterValidator';
import { ValidationErrorException } from '../../src/Exceptions/ErrorResults/ValidationErrorException';
import { Login } from '../../src/Validators/LoginValidator';
import { UserModel } from '../../src/Models/UserModel';
import { Crypto } from '../../src/Utils/Crypto';
import { LoginErrorException } from '../../src/Exceptions/ErrorResults/LoginErrorException';

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

        it('It should throw validation error', async () => {
            const body: Register = {
                login: 'user123',
                email: 'user123@gmail.com',
                password: '12341234',
                confirmPassword: '1231234'
            };
            const createUser = sandbox.stub(UserService, 'createUser');
            createUser.resolves('jwt_token');

            const req = mock.createRequest({ body });
            const res = mock.createResponse();

            const authController = new AuthController();

            let error: object | null = null;
            try {
                await authController.register(req, res);
            } catch (e) {
                error = e;
            }
            expect(error).to.be.instanceOf(ValidationErrorException);
            expect((error as ValidationErrorException).getResponse()).to.not.be
                .null;
        });
    });

    describe('Login route', () => {
        let sandbox: SinonSandbox;

        before(() => {
            sandbox = createSandbox();
        });
        afterEach(() => {
            sandbox.restore();
        });

        it('It should login user', async () => {
            const body: Login = {
                login: 'user',
                password: '12341234'
            };
            const createUser = sandbox.stub(UserService, 'getUserByLogin');
            createUser.resolves(
                new UserModel({
                    login: body.login,
                    password: body.password,
                    email: 'email@gmail.com',
                    key: 'secretkey'
                })
            );

            const comparePasswords = sandbox.stub(Crypto, 'comparePassword');
            comparePasswords.resolves(true);

            const req = mock.createRequest({ body });
            const res = mock.createResponse();

            const authController = new AuthController();
            await authController.login(req, res);
            const json = res._getData();

            expect(res.statusCode).to.equal(200);
            expect(json).to.haveOwnProperty('token');
            expect(json).to.haveOwnProperty('token').not.empty;
        });

        it('It should throw validation error', async () => {
            const body: Login = {
                login: 'u',
                password: '12341234'
            };
            const createUser = sandbox.stub(UserService, 'getUserByLogin');
            createUser.resolves(
                new UserModel({
                    login: body.login,
                    password: body.password,
                    email: 'email@gmail.com',
                    key: 'secretkey'
                })
            );

            const comparePasswords = sandbox.stub(Crypto, 'comparePassword');
            comparePasswords.resolves(true);

            const req = mock.createRequest({ body });
            const res = mock.createResponse();

            const authController = new AuthController();
            let error: object | null = null;
            try {
                await authController.login(req, res);
            } catch (e) {
                error = e;
            }
            expect(error).to.be.instanceOf(ValidationErrorException);
            expect((error as ValidationErrorException).getResponse()).to.not.be
                .null;
        });

        it('It should throw login error by wrong login', async () => {
            const body: Login = {
                login: 'user',
                password: '12341234'
            };
            const createUser = sandbox.stub(UserService, 'getUserByLogin');
            createUser.resolves(null);

            const comparePasswords = sandbox.stub(Crypto, 'comparePassword');
            comparePasswords.resolves(true);

            const req = mock.createRequest({ body });
            const res = mock.createResponse();

            const authController = new AuthController();
            let error: object | null = null;
            try {
                await authController.login(req, res);
            } catch (e) {
                error = e;
            }
            expect(error).to.be.instanceOf(LoginErrorException);
            expect((error as LoginErrorException).getResponse()).to.not.be.null;
        });

        it('It should throw login error by wrong password', async () => {
            const body: Login = {
                login: 'user',
                password: '12341234'
            };
            const createUser = sandbox.stub(UserService, 'getUserByLogin');
            createUser.resolves(
                new UserModel({
                    login: body.login,
                    password: body.password,
                    email: 'email@gmail.com',
                    key: 'secretkey'
                })
            );

            const comparePasswords = sandbox.stub(Crypto, 'comparePassword');
            comparePasswords.resolves(false);

            const req = mock.createRequest({ body });
            const res = mock.createResponse();

            const authController = new AuthController();
            let error: object | null = null;
            try {
                await authController.login(req, res);
            } catch (e) {
                error = e;
            }
            expect(error).to.be.instanceOf(LoginErrorException);
            expect((error as LoginErrorException).getResponse()).to.not.be.null;
        });
    });
});
