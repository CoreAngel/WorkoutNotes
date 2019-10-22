import {Request, Response} from 'express';
import {IUser, UserModel} from '../Models/UserModel';
import {IRegister, RegisterValidator} from '../Validators/RegisterValidator';
import {AbstractController} from './AbstractController';
import {Crypto} from '../Utils/Crypto';
import {Token} from '../Utils/Token';
import {Controller} from './Decorators/Controller'
import {Post} from './Decorators/HttpMethods'

@Controller('/auth')
export class AuthController extends AbstractController {

    @Post('/register')
    public register = async (req: Request, res: Response) => {
        const {login, email, password, confirmPassword} = req.body;
        const registerData: IRegister = {
            login,
            email,
            password,
            confirmPassword
        };

        const registerValidator = new RegisterValidator();
        const {valid, error} = registerValidator.validate(registerData);

        if(!valid) {
            return res.send(this.sendErrorValidation(error)).end();
        }

        const data = await UserModel.findOne({login});
        if(data !== null) {
            return res.send(this.sendErrorValidation(['Login exists!'])).end();
        }

        this.createUser(registerData).then((token: string) => {
            return res.send(this.sendOK({token})).end();
        }).catch(() => {
            return res.status(503)
                .send(this.sendErrorServer({}))
                .end();
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
