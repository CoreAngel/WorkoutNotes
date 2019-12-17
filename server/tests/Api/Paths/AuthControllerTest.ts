import { it } from 'mocha';
import request from 'supertest';
import { expect } from 'chai';

export class AuthControllerTests {
    public static runTests = (): void => {
        describe('Register', () => {
            // @TODO uncomment when deleting user api will be created
            AuthControllerTests.runRegister();
        });
    };

    private static runRegister = (): void => {
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
            expect(response.body.token).to.exist;
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
            expect(response.status).to.equal(401);
            expect(response.body.errors).length.greaterThan(0);
        }).timeout(10000);
    };
}
