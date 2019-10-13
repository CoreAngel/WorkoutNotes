export type HttpMethod = 'get' | 'post' | 'delete' | 'options' | 'put';

export interface RouteDefinition {
    path: string;
    requestMethod: HttpMethod;
    methodName: string;
}
