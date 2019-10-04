import { config } from 'dotenv';
import { connect } from 'mongoose';

export class ApplicationPreConfig {

    constructor() {
        this.dotenvConfig();
        this.mongooseConfig();
    };

    private dotenvConfig = (): void => {
        config();
    };

    private mongooseConfig = (): void => {
        const mongoUrl: string = process.env.MONGODB || '';

        connect(
            mongoUrl,
            {
                useCreateIndex: true,
                useNewUrlParser: true
            }
        )
        .then(() => { console.log("connected to db") })
        .catch((e) => { throw e });
    };
}
