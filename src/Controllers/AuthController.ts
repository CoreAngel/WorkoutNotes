import { Response, Request } from 'express';
import { UserModel, IUser } from '../Models/UserModel';
import { IRegister, RegisterValidator } from '../Validators/RegisterValidator';
import { RespondStatus, RespondErrorType, AbstractController } from './AbstractController';
import { Crypto } from '../Utils/Crypto';
import { Token } from '../Utils/Token';
import { Controller } from './Decorators/Controller'
import { Post } from './Decorators/HttpMethods'

@Controller('/auth')
export class AuthController implements AbstractController {

    @Post('/register')
    public register = async (req: Request, res: Response) => {
        const registerData: IRegister = {
            login: req.body.login,
            email: req.body.email,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword
        };

        const registerValidator = new RegisterValidator();
        const {valid, error} = registerValidator.validate(registerData);

        if(!valid) {
            return res.send({
                status: RespondStatus.ERROR,
                type: RespondErrorType.VALIDATION,
                data: error
            }).end();
        }

        const { login } = registerData;
        const data = await UserModel.findOne({login});

        if(data !== null) {
            return res.send({
                status: RespondStatus.ERROR,
                type: RespondErrorType.VALIDATION,
                data: ['Login exists!']
            }).end();
        }

        this.createUser(registerData).then((token: string) => {
            return res.send({
                status: RespondStatus.OK,
                token: token
            }).end();
        }).catch(() => {
            return res.status(503).send({
                status: RespondStatus.ERROR,
                type: RespondErrorType.SERVER
            }).end();
        })
    };

    private createUser = async (data: IRegister): Promise<string> => {
        return new Promise(async (resolve, reject) => {
            const { login, email, password } = data;
            const hashedPassword = await Crypto.hashPassword(password);

            const user: IUser = new UserModel({
                login,
                email,
                password: hashedPassword
            });

            try {
                const data = await user.save();
                const userId = data._id;
                const generatedToken = await Token.generate(userId);
                const { nModified } = await user.updateOne({token: generatedToken});

                if (nModified !== 1) {
                    reject('No user created');
                }
                resolve(generatedToken);
            } catch (e) {
                reject('Error with db');
            }
        });
    }

}
