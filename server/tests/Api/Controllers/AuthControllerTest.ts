import { it } from 'mocha';
import request from 'supertest';
import { expect } from 'chai';
import {
    RespondErrorType,
    RespondStatus
} from '../../../src/Controllers/AbstractController';

export class AuthControllerTests {
    public static runTests = (): void => {
        describe('Register', () => {
            // @TODO uncomment when deleting user api will be created
            // AuthControllerTests.runRegister();
        });
    };

    private static runRegister = () => {
        it('Should create user', async () => {
            const response = await request(global.testServer)
                .post('/auth/register')
                .send({
                    login: process.env.TESTUSER,
                    email: 'testemial@test.com',
                    password: '12341234',
                    confirmPassword: '12341234'
                });
            expect(response.status).to.equal(200);
            expect(response.body.status).to.equal(RespondStatus.OK);
            expect(response.body.body.token).to.exist;
        }).timeout(10000);

        it('Expect user exist', async () => {
            const response = await request(global.testServer)
                .post('/auth/register')
                .send({
                    login: process.env.TESTUSER,
                    email: 'testemial@test.com',
                    password: '12341234',
                    confirmPassword: '12341234'
                });
            expect(response.status).to.equal(200);
            expect(response.body.status).to.equal(RespondStatus.ERROR);
            expect(response.body.type).to.equal(RespondErrorType.VALIDATION);
        }).timeout(10000);
    };
}
