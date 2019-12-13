import { connect, disconnect } from 'mongoose';
import { App, ServerEvents } from '../Server/App';

export enum DBEvents {
    DB_READY = 'db.ready',
    DB_ERROR = 'db.error'
}

export class Mongo {
    public static connect = (): void => {
        App.mediator.once(ServerEvents.SERVER_READY, () => {
            const mongoUrl: string = process.env.MONGODB || '';

            connect(mongoUrl, {
                useCreateIndex: true,
                useNewUrlParser: true
            })
                .then(db => {
                    App.mediator.emit(DBEvents.DB_READY, db);
                })
                .catch(e => {
                    App.mediator.emit(DBEvents.DB_ERROR, e);
                    console.error(`DB error ${e}`);
                });
        });
    };

    public static disconnect = (): void => {
        disconnect();
    };
}
