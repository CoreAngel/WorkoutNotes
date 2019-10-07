import express, { Application } from 'express';
import { ApplicationPreConfig } from './config';
import { AbstractController } from './Controllers/AbstractController'
import { AuthController } from './Controllers/AuthController'

class App {
    private port: number;
    private app: Application;
    private configInstance: ApplicationPreConfig;
    private controllers: Array<AbstractController>;

    constructor(port: number) {
        this.port = port;
        this.controllers = [
            new AuthController()
        ];

        this.configInstance = new ApplicationPreConfig();
        this.app = express();

        this.initializeMiddlewares();
        this.initializeRoutes();
        this.listen();
    };

    private initializeMiddlewares = (): void => {
        this.app.use(express.json())
    };

    private initializeRoutes = (): void => {
        this.controllers.map((controller) => {
            this.app.use('/', controller.router);
        });
    };

    private listen = (): void  => {
        this.app.listen(this.port, () => {
            console.log(`Listen on the port ${this.port}`);
        });
    }
}

const appInstance = new App(3000);




