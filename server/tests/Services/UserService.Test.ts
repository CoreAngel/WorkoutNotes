import { expect } from 'chai';
import { createSandbox, SinonSandbox, fake, SinonSpy, SinonStub } from 'sinon';
import db from 'mongoose';
import { UserService } from '../../src/Services/UserService';
import { UserModel } from '../../src/Models/UserModel';
import { Register } from '../../src/Validators/RegisterValidator';
import { DbErrorException } from '../../src/Exceptions/ErrorResults/DbErrorException';
import { ValidationErrorException } from '../../src/Exceptions/ErrorResults/ValidationErrorException';

describe('User Service', () => {
    let sandbox: SinonSandbox,
        save: SinonStub,
        findOne: SinonStub,
        findById: SinonStub,
        database: SinonStub,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        session: any;

    before(() => {
        sandbox = createSandbox();
    });

    beforeEach(() => {
        save = sandbox.stub(db.Model.prototype, 'save');
        const user = new UserModel({
            login: 'user',
            password: 'pass',
            email: 'email@gmail.com',
            key: 'key'
        });
        user._id = '1';
        save.resolves(user);

        findOne = sandbox.stub(db.Model, 'findOne');
        findOne.resolves(user);

        findById = sandbox.stub(db.Model, 'findById');
        findById.resolves(user);

        const startTransaction: SinonSpy = fake();
        const abortTransaction: SinonSpy = fake();
        const commitTransaction: SinonSpy = fake();
        const endSession: SinonSpy = fake();
        session = {
            startTransaction,
            abortTransaction,
            commitTransaction,
            endSession
        };

        database = sandbox.stub(db, 'startSession');
        database.resolves(session);
    });

    afterEach(() => {
        sandbox.restore();
    });

    describe('createUser', () => {
        it('It should create user', async () => {
            const user: Register = {
                login: 'user',
                password: 'pass',
                confirmPassword: 'pass',
                email: 'email@gmail.com'
            };

            const isUserWithLogin = sandbox.stub(
                UserService,
                'isUserWithLoginExist'
            );
            isUserWithLogin.resolves(false);

            const token = await UserService.createUser(user);
            expect(token).to.be.not.empty;
            expect(session.startTransaction.callCount).to.be.equal(1);
            expect(session.endSession.callCount).to.be.equal(1);
            expect(session.abortTransaction.callCount).to.be.equal(0);
            expect(session.commitTransaction.callCount).to.be.equal(1);
        });

        it('It should throw db error because start session reject', async () => {
            const user: Register = {
                login: 'user',
                password: 'pass',
                confirmPassword: 'pass',
                email: 'email@gmail.com'
            };

            database.rejects('error');

            let error: object | null = null;
            try {
                await UserService.createUser(user);
            } catch (e) {
                error = e;
            }

            expect(error).to.be.instanceOf(DbErrorException);
        });

        it('It should throw validation error', async () => {
            const user: Register = {
                login: 'user',
                password: 'pass',
                confirmPassword: 'pass',
                email: 'email@gmail.com'
            };

            const isUserWithLogin = sandbox.stub(
                UserService,
                'isUserWithLoginExist'
            );
            isUserWithLogin.resolves(true);

            let error: object | null = null;
            try {
                await UserService.createUser(user);
            } catch (e) {
                error = e;
            }

            expect(error).to.be.instanceOf(ValidationErrorException);
            expect(session.startTransaction.callCount).to.be.equal(1);
            expect(session.endSession.callCount).to.be.equal(1);
            expect(session.abortTransaction.callCount).to.be.equal(1);
            expect(session.commitTransaction.callCount).to.be.equal(0);
        });

        it('It should throw db error because save reject', async () => {
            const user: Register = {
                login: 'user',
                password: 'pass',
                confirmPassword: 'pass',
                email: 'email@gmail.com'
            };

            const isUserWithLogin = sandbox.stub(
                UserService,
                'isUserWithLoginExist'
            );
            isUserWithLogin.resolves(false);
            save.rejects('error');

            let error: object | null = null;
            try {
                await UserService.createUser(user);
            } catch (e) {
                error = e;
            }

            expect(error).to.be.instanceOf(DbErrorException);
            expect(session.startTransaction.callCount).to.be.equal(1);
            expect(session.endSession.callCount).to.be.equal(1);
            expect(session.abortTransaction.callCount).to.be.equal(1);
            expect(session.commitTransaction.callCount).to.be.equal(0);
        });
    });

    describe('getUserByAuthentication', () => {
        it('It should return user', async () => {
            const user = await UserService.getUserByAuthentication('1', 'key');

            expect(user).to.be.not.equal(null);
        });

        it('It should return null because wrong id', async () => {
            findById.resolves(null);
            const user = await UserService.getUserByAuthentication('1', 'key');

            expect(user).to.be.equal(null);
        });

        it('It should return null because wrong key', async () => {
            const user = await UserService.getUserByAuthentication(
                '1',
                'wrong_key'
            );

            expect(user).to.be.equal(null);
        });
    });
});
