import { App, ApplicationEvents, ServerEvents } from '../../src/Server/App';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Application } from 'express';
import { before } from 'mocha';
import { AuthControllerTests } from './Paths/AuthControllerTest';

declare global {
    namespace NodeJS {
        interface Global {
            testServer: Application;
            testApplication: App;
        }
    }
}

if (process.env.api) {
    describe('API', () => {
        before(done => {
            global.testApplication = new App(4000);

            App.mediator.once(ServerEvents.SERVER_READY, server => {
                global.testServer = server;
            });
            App.mediator.once(ApplicationEvents.APP_READY, () => {
                done();
            });
        });

        after(() => {
            global.testApplication.close();
        });

        describe('AuthController', () => {
            AuthControllerTests.runTests();
        });
    });
}
