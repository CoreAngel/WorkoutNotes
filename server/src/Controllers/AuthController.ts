import { Request, Response } from 'express';
import { Register, RegisterValidator } from '../Validators/RegisterValidator';
import { AbstractController } from './AbstractController';
import { UserService } from '../Services/UserService';
import { Controller } from './Decorators/Controller';
import { Post } from './Decorators/HttpMethods';

@Controller('/auth')
export class AuthController extends AbstractController {
    @Post('/register')
    public register = async (req: Request, res: Response): Promise<void> => {
        const { login, email, password, confirmPassword } = req.body;
        const registerData: Register = {
            login,
            email,
            password,
            confirmPassword
        };

        const registerValidator = new RegisterValidator();
        const { valid, error } = registerValidator.validate(registerData);

        if (!valid) {
            return res.send(this.sendErrorValidation(error)).end();
        }

        // UserService.isUserWithLoginExist(login).then(status => {
        //     if (status) {
        //         return res.send(this.sendErrorValidation(['Login exists!'])).end();
        //     }
        // });
        UserService.createUser(registerData)
            .then((token: string) => {
                return res.send(this.sendOK({ token })).end();
            })
            .catch(() => {
                return res
                    .status(503)
                    .send(this.sendErrorServer({}))
                    .end();
            });
    };
}
