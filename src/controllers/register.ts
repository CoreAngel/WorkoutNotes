import { Response, Request } from 'express';
import { UserModel, IUser } from '../models/user';
import {IRegister, RegisterValidator} from '../validations/register';
const { hashPassword } = require('../utils/crypto');
const { generateToken } = require('../utils/token');

const registerController = async (req: Request, res: Response) => {
    const registerData: IRegister = {
        login: req.body.login,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
    };

    const registerValidator: RegisterValidator = new RegisterValidator();
    const {valid, error, value} = registerValidator.validate(registerData);

    if(!valid) {
        return res.send({
            status: 'Error',
            type: 'validation',
            data: error
        }).end();
    }

    const { login, email, password } = value;
    const data = await UserModel.findOne({login});

    if(data !== null) {
        return res.send({
            status: 'Error',
            type: 'validation',
            data: ['Login exists!']
        }).end();
    }
    const hashedPassword = await hashPassword(password);

    const user: IUser = new UserModel({
        login,
        email,
        password: hashedPassword
    });

    try {
        const data = await user.save();
        const userId = data._id;
        const generatedToken = await generateToken(userId);
        const { nModified } = await user.updateOne({token: generatedToken});

        if (nModified !== 1) {
            return res.status(503).end();
        }

        return res.send({
            status: 'OK',
            token: generatedToken
        }).end();
    } catch (e) {
        return res.status(503).end();
    }
};

module.exports = registerController;
