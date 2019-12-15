import { Request, Response } from 'express';
import { Register, RegisterValidator } from '../Validators/RegisterValidator';
import { AbstractController } from './AbstractController';
import { UserService } from '../Services/UserService';
import { Controller } from './Decorators/Controller';
import { Post } from './Decorators/HttpMethods';
import { ValidationErrorException } from '../Exceptions/ErrorResults/ValidationErrorException';
import { AbstractErrorException } from '../Exceptions/ErrorResults/AbstractErrorException';

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

        UserService.createUser(registerData)
            .then((token: string) => {
                return res
                    .status(200)
                    .send({ token })
                    .end();
            })
            .catch(e => {
                this.throwCustomErrors(e, res);
            });
    };
}
