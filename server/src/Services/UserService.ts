import db, { ClientSession } from 'mongoose';
import { User, UserModel } from '../Models/UserModel';
import { Register } from '../Validators/RegisterValidator';
import { Crypto } from '../Utils/Crypto';
import { Token } from '../Utils/Token';
import { ValidationErrorException } from '../Exceptions/ErrorResults/ValidationErrorException';
import { DbErrorException } from '../Exceptions/ErrorResults/DbErrorException';

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
            try {
                session = await db.startSession();
                session.startTransaction();
            } catch (e) {
                return reject(new DbErrorException());
            }

            const status = await UserService.isUserWithLoginExist(user.login);
            if (status) {
                await session.abortTransaction();
                session.endSession();
                return reject(new ValidationErrorException(['Login exists!']));
            }

            try {
                const data = await user.save({ session });
                const userId = data._id;
                const token = await Token.generate(userId);
                await session.commitTransaction();
                resolve(token);
            } catch (e) {
                await session.abortTransaction();
                return reject(new DbErrorException());
            } finally {
                session.endSession();
            }
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
