import express, { Application } from 'express';
import { ApplicationPreConfig } from './config';
import { authRouter } from './routes/auth'

class App {
    private port: number;
    private app: Application;
    private configInstance: ApplicationPreConfig;

    constructor(port: number) {
        this.port = port;

        this.configInstance = new ApplicationPreConfig();
        this.app = express();

        this.initializeMiddlewares();
        this.initializeControllers();
        this.listen();
    };

    private initializeMiddlewares = (): void => {
        this.app.use(express.json())
    };

    private initializeControllers = (): void => {
        this.app.use('/auth', authRouter);
    };

    private listen = (): void  => {
        this.app.listen(this.port, () => {
            console.log(`Listen on the port ${this.port}`);
        });
    }
}

const appInstance: App = new App(3000);




