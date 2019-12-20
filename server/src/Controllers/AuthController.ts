import { Request, Response } from 'express';
import { Register, RegisterValidator } from '../Validators/RegisterValidator';
import { Login, LoginValidator } from '../Validators/LoginValidator';
import { AbstractController } from './AbstractController';
import { UserService } from '../Services/UserService';
import { Controller } from './Decorators/Controller';
import { Post } from './Decorators/HttpMethods';
import { ValidationErrorException } from '../Exceptions/ErrorResults/ValidationErrorException';
import { LoginErrorException } from '../Exceptions/ErrorResults/LoginErrorException';
import { Crypto } from '../Utils/Crypto';
import { Token } from '../Utils/Token';

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
            throw new ValidationErrorException(error, res);
        }

        try {
            const token = await UserService.createUser(registerData);
            return res
                .status(200)
                .send({ token })
                .end();
        } catch (e) {
            this.throwCustomErrors(e, res);
            throw e;
        }
    };

    @Post('/login')
    public login = async (req: Request, res: Response): Promise<void> => {
        const { login, password } = req.body;
        const loginData: Login = {
            login,
            password
        };

        const loginValidator = new LoginValidator();
        const { valid, error } = loginValidator.validate(loginData);

        if (!valid) {
            throw new ValidationErrorException(error, res);
        }

        const user = await UserService.getUserByLogin(login);
        if (!user) {
            throw new LoginErrorException(res);
        }

        const status = await Crypto.comparePassword(password, user.password);
        if (!status) {
            throw new LoginErrorException(res);
        }

        const token = await Token.generate(user._id, user.key);
        return res
            .status(200)
            .send({ token })
            .end();
    };
}
