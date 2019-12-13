import { config as DotEnvConfig } from 'dotenv';
import { AuthController } from '../Controllers/AuthController';
import { Server, ServerOptions } from './Server';
import { DBEvents, Mongo } from '../Config/Mongo';
import { EventEmitter } from 'events';
import { Server as HttpServer } from 'http';
import 'reflect-metadata';

export enum ApplicationEvents {
    APP_READY = 'server.ready',
    APP_ERROR = 'server.error'
}

export enum ServerEvents {
    SERVER_READY = 'server.ready',
    SERVER_ERROR = 'server.error'
}

export class App {
    public static mediator: EventEmitter = new EventEmitter();
    private static controllers: object[] = [AuthController];
    public server: HttpServer | undefined;

    constructor(port: number) {
        this.applicationFullyRunning();
        this.configurationBeforeRun();

        const serverOptions: ServerOptions = {
            port,
            controllers: App.controllers
        };

        Server.start(serverOptions)
            .then(app => {
                this.server = Server.server;
                App.mediator.emit(ServerEvents.SERVER_READY, app);
            })
            .catch(err => {
                App.mediator.emit(ServerEvents.SERVER_ERROR, err);
                console.error(`Server error ${err}`);
            });

        App.mediator.once(ApplicationEvents.APP_READY, () =>
            console.log('Application running')
        );
        App.mediator.once(ApplicationEvents.APP_ERROR, () => {
            console.log('Application error');
            Mongo.disconnect();
            process.exit(-1);
        });
    }

    private configurationBeforeRun = (): void => {
        DotEnvConfig();
        Mongo.connect();
    };

    private applicationFullyRunning = (): void => {
        const promises: Promise<void>[] = [];

        promises.push(
            new Promise((resolve, reject) => {
                App.mediator.once(ServerEvents.SERVER_READY, () => resolve());
                App.mediator.once(ServerEvents.SERVER_ERROR, () => reject());
            })
        );
        promises.push(
            new Promise((resolve, reject) => {
                App.mediator.once(DBEvents.DB_READY, () => resolve());
                App.mediator.once(DBEvents.DB_ERROR, () => reject());
            })
        );

        Promise.all<void>(promises)
            .then(() => App.mediator.emit(ApplicationEvents.APP_READY))
            .catch(() => App.mediator.emit(ApplicationEvents.APP_ERROR));
    };

    public close = (): void => {
        Mongo.disconnect();
        if (this.server != null) {
            this.server.close();
        }
    };
}
