import db, { ClientSession } from 'mongoose';
import { User, UserModel } from '../Models/UserModel';
import { Register } from '../Validators/RegisterValidator';
import { Crypto } from '../Utils/Crypto';
import { Token } from '../Utils/Token';
import { ValidationErrorException } from '../Exceptions/ErrorResults/ValidationErrorException';
import { DbErrorException } from '../Exceptions/ErrorResults/DbErrorException';

export class UserService {
    public static createUser = async (data: Register): Promise<string> => {
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
            throw new DbErrorException();
        }

        const status = await UserService.isUserWithLoginExist(user.login);
        if (status) {
            await session.abortTransaction();
            session.endSession();
            throw new ValidationErrorException(['Login exists!']);
        }

        try {
            const data = await user.save({ session });
            const userId = data._id;
            const token = await Token.generate(userId);
            await session.commitTransaction();
            return token;
        } catch (e) {
            await session.abortTransaction();
            throw new DbErrorException();
        } finally {
            session.endSession();
        }
    };

    public static isUserWithLoginExist = async (
        login: string
    ): Promise<boolean> => {
        const user = UserModel.findOne({ login });
        return user != null;
    };
}
