import { Router, Request, Response } from 'express';
const registerController = require('../controllers/register');

export const authRouter = Router();

authRouter.post('/register', (req: Request, res: Response) => {
    registerController(req, res);
});
