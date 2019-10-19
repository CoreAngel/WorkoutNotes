import { config as DotEnvConfig } from 'dotenv';
import { AuthController } from './Controllers/AuthController'
import {Server, ServerOptions} from "./Server/Server";
import { EventEmitter } from 'events'
import 'reflect-metadata';
import {Mongo} from "./Config/Mongo";


export enum ServerEvents {
    SERVER_READY= 'server.ready',
    SERVER_ERROR = 'server.error'
}

export class App {
    public static mediator: EventEmitter = new EventEmitter();
    private static controllers: any[] = [
            AuthController
    ];

    constructor(port: number) {
        this.configurationBeforeRun();

        const serverOptions: ServerOptions = {
            port,
            controllers: App.controllers
        };

        Server.start(serverOptions).then(server => {
            App.mediator.emit(ServerEvents.SERVER_READY, server);
            console.log('Server running');
        }).catch(err => {
            App.mediator.emit(ServerEvents.SERVER_ERROR, err);
            console.error('Server error');
            Mongo.disconnect();
            process.exit(-1);
        })
    };

    private configurationBeforeRun = () => {
        DotEnvConfig();
        Mongo.connect();
    };
}

const appInstance = new App(3000);




