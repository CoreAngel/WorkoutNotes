import { Request, Response, NextFunction } from 'express';

type middlewareType = (req: Request, res: Response, next: NextFunction) => void;

export const middlewareUnlessPath = (
    middleware: Function,
    paths: string[]
): middlewareType => {
    return (req, res, next): void => {
        const isExclude = paths.some(path => path === req.path);
        isExclude ? next() : middleware(req, res, next);
    };
};
