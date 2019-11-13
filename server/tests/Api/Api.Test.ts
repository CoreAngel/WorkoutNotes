import {App, ApplicationEvents, ServerEvents} from '../../src/Server/App'
import {Application} from "express";
import { before } from 'mocha'
import {AuthControllerTests} from "./Controllers/AuthControllerTest";

declare global {
    namespace NodeJS {
        interface Global {
            testServer: Application;
            testApplication: App;
        }
    }
}

describe('API', () => {

    before((done) => {
        global.testApplication = new App(3000);

        App.mediator.once(ServerEvents.SERVER_READY, (server) => {
            global.testServer = server;
        });
        App.mediator.once(ApplicationEvents.APP_READY, () => {
            done();
        })

    });

    after(() => {
        global.testApplication.close();
    });

    describe('AuthController', () => {
        AuthControllerTests.runTests();
    })



});