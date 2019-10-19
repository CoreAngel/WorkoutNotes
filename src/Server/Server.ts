import express, { Application, Response, Request } from 'express';
import {RouteDefinition} from "../Controllers/Decorators";

export interface ServerOptions {
    port: number
    controllers: any[]
}

export class Server {
    public static app: Application;

    public static start = (options: ServerOptions): Promise<Application> => {
        Server.app = express();
        Server.initializeMiddlewares();
        Server.initializeRoutes(options.controllers);

        return new Promise((resolve, reject) => {
            Server.app.listen(options.port, () => {
                resolve(Server.app);
            })
        });
    };

    private static initializeMiddlewares = (): void => {
        Server.app.use(express.json())
    };

    private static initializeRoutes = (controllers: any[]): void => {
        controllers.map((controller) => {
            const instance = new controller();
            const prefix = Reflect.getMetadata('ROUTE_PREFIX', controller);
            const routes: Array<RouteDefinition> = Reflect.getMetadata('ROUTES', controller);

            routes.map(route => {
                Server.app[route.requestMethod](prefix + route.path, (req: Request, res: Response) => {
                    instance[route.methodName](req, res);
                });
            });
        });
    };

}
