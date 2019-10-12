import { config } from 'dotenv';
import { connect, Mongoose, disconnect} from 'mongoose';

export class ApplicationPreConfig {

    private static dotenvConfig = (): void => {
        config();
    };

    private static connectToDB = async (): Promise<Mongoose> => {
        const mongoUrl: string = process.env.MONGODB || '';

        return connect(
            mongoUrl,
            {
                useCreateIndex: true,
                useNewUrlParser: true
            }
        )
    };

    public static configure = (): Promise<any>[] => {
        const promises: Promise<any>[] = [];

        ApplicationPreConfig.dotenvConfig();
        const dbPromise = ApplicationPreConfig.connectToDB();

        promises.push(dbPromise);

        return promises;
    };

    public static closeDB = (): Promise<void> => {
        return disconnect();
    }
}
