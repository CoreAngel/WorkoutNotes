import 'reflect-metadata';
import { RouteDefinition, HttpMethod } from './index';

const httpMethodFactory = (method: HttpMethod) => {
    return (path: string): PropertyDecorator => {
        return (target: object, propertyKey: symbol | string): void => {
            if (!Reflect.hasMetadata('ROUTES', target.constructor)) {
                Reflect.defineMetadata('ROUTES', [], target.constructor);
            }

            const routes: RouteDefinition[] = Reflect.getMetadata(
                'ROUTES',
                target.constructor
            );

            routes.push({
                requestMethod: method,
                path,
                methodName: propertyKey as string
            });
            Reflect.defineMetadata('routes', routes, target.constructor);
        };
    };
};

export const Get = httpMethodFactory('get');
export const Post = httpMethodFactory('post');
export const Delete = httpMethodFactory('delete');
export const Options = httpMethodFactory('options');
export const Put = httpMethodFactory('put');
