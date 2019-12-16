import express, { Application, Response, Request } from 'express';
import { RouteDefinition } from '../Controllers/Decorators';
import { Server as HttpServer } from 'http';

export interface ServerOptions {
    port: number;
    controllers: object[];
}

export class Server {
    public static app: Application;
    public static server: HttpServer;

    public static start = async (
        options: ServerOptions
    ): Promise<Application> => {
        Server.app = express();
        Server.initializeMiddlewares();
        Server.initializeRoutes(options.controllers);

        Server.server = Server.app.listen(options.port);
        return Server.app;
    };

    private static initializeMiddlewares = (): void => {
        Server.app.use(express.json());
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private static initializeRoutes = (controllers: any[]): void => {
        controllers.map(controller => {
            const instance = new controller();
            const prefix = Reflect.getMetadata('ROUTE_PREFIX', controller);
            const routes: Array<RouteDefinition> = Reflect.getMetadata(
                'ROUTES',
                controller
            );

            routes.map(route => {
                Server.app[route.requestMethod](
                    prefix + route.path,
                    (req: Request, res: Response) => {
                        instance[route.methodName](req, res);
                    }
                );
            });
        });
    };
}
