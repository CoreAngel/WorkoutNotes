import 'reflect-metadata';

export const Controller = (prefix = ''): ClassDecorator => {
    return (target: Function): void => {
        Reflect.defineMetadata('ROUTE_PREFIX', prefix, target);

        if (!Reflect.hasMetadata('ROUTES', target)) {
            //controller has no defined routes
            Reflect.defineMetadata('ROUTES', [], target);
        }
    };
};
