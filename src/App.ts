import express, { Application, Response, Request } from 'express';
import { ApplicationPreConfig } from './config';
import { AbstractController } from './Controllers/AbstractController'
import { AuthController } from './Controllers/AuthController'
import { RouteDefinition } from './Controllers/Decorators'
import 'reflect-metadata';

class App {
    private port: number;
    private app: Application;
    private controllers: any[];
    public configurePromises: Promise<any>[] = [];

    constructor(port: number) {
        console.log('Configures the server...');

        this.port = port;
        this.controllers = [
            AuthController
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
            const instance = new controller();
            const prefix = Reflect.getMetadata('ROUTE_PREFIX', controller);
            const routes: Array<RouteDefinition> = Reflect.getMetadata('ROUTES', controller);

            routes.map(route => {
                this.app[route.requestMethod](prefix + route.path, (req: Request, res: Response) => {
                    instance[route.methodName](req, res);
                });
            });
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




