import { expect } from 'chai';
import { createSandbox, SinonSandbox, fake, SinonSpy, SinonStub } from 'sinon';
import db, { ClientSession } from 'mongoose';
import { UserService } from '../../src/Services/UserService';
import { UserModel } from '../../src/Models/UserModel';
import { Register } from '../../src/Validators/RegisterValidator';

describe('User Service', () => {
    let sandbox: SinonSandbox,
        save: SinonStub,
        findOne: SinonStub,
        findById: SinonStub,
        session: unknown;

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

        const database = sandbox.stub(db, 'startSession');
        database.resolves(session as ClientSession);
    });

    afterEach(() => {
        sandbox.restore();
    });

    it('createUser: It should create user', async () => {
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
    });
});
