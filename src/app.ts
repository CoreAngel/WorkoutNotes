import express, { Application } from 'express';
import { ApplicationPreConfig } from './config';
import { AbstractController } from './Controllers/AbstractController'
import { AuthController } from './Controllers/AuthController'

class App {
    private port: number;
    private app: Application;
    private controllers: AbstractController[];
    public configurePromises: Promise<any>[] = [];

    constructor(port: number) {
        console.log('Configures the server...');

        this.port = port;
        this.controllers = [
            new AuthController()
        ];

        const promises = ApplicationPreConfig.configure();
        this.app = express();

        this.initializeMiddlewares();
        this.initializeRoutes();
        const listenAppPromise = this.listen();

        this.configurePromises.push(...promises);
        this.configurePromises.push(listenAppPromise);

        Promise.all(this.configurePromises).then(() => {
            console.log('The server is running');
        }).catch((e) => {
            console.error(e);
        })
    };

    private initializeMiddlewares = (): void => {
        this.app.use(express.json())
    };

    private initializeRoutes = (): void => {
        this.controllers.map((controller) => {
            this.app.use('/', controller.router);
        });
    };

    private listen = (): Promise<any>  => {
        return new Promise((resolve: any, reject: any) => {
            try {
                this.app.listen(this.port, () => {
                    resolve();
                });
            } catch (e) {
                reject(e);
            }
        })

    }
}

const appInstance = new App(3000);




