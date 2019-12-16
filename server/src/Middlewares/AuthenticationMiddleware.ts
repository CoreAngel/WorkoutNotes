import { Request, Response, NextFunction } from 'express';
import { AuthenticatedErrorExcepction } from '../Exceptions/ErrorResults/AuthenticatedErrorExcepction';
import { Token } from '../Utils/Token';
import { UserService } from '../Services/UserService';

export const authenticationMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    const token = req.header('Authentication');
    if (!token) {
        throw new AuthenticatedErrorExcepction(res);
    }

    const payload = await Token.verify(token);
    if (!payload) {
        throw new AuthenticatedErrorExcepction(res);
    }

    const user = await UserService.getUserByAuthentication(
        payload.id,
        payload.key
    );
    if (!user) {
        throw new AuthenticatedErrorExcepction(res);
    }

    req.headers['Authenticated-User'] = user._id;
    next();
};
