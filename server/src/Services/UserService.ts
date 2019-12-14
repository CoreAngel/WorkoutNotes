import db, { ClientSession } from 'mongoose';
import { User, UserModel } from '../Models/UserModel';
import { Register } from '../Validators/RegisterValidator';
import { Crypto } from '../Utils/Crypto';
import { Token } from '../Utils/Token';

export class UserService {
    public static createUser = (data: Register): Promise<string> => {
        return new Promise(async (resolve, reject) => {
            const { login, email, password } = data;
            const hashedPassword = await Crypto.hashPassword(password);

            const user: User = new UserModel({
                login,
                email,
                password: hashedPassword
            });

            let session: ClientSession;
            db.startSession()
                .then(_session => {
                    session = _session;
                    session.startTransaction();

                    return UserService.isUserWithLoginExist(user.login);
                })
                .then(status => {
                    if (status) {
                        throw 'Login exists!';
                    }
                })
                .then(() => {
                    return user.save({ session });
                })
                .then(data => {
                    const userId = data._id;

                    return Token.generate(userId);
                })
                .then(async token => {
                    await session.commitTransaction();
                    resolve(token);
                })
                .catch(async () => {
                    await session.abortTransaction();
                    reject('Error with db');
                })
                .finally(() => {
                    session.endSession();
                });
        });
    };

    public static isUserWithLoginExist(login: string): Promise<boolean> {
        return new Promise(async resolve => {
            UserModel.findOne({ login }).then(user => {
                resolve(user != null);
            });
        });
    }
}
