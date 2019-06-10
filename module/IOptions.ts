import {IModuleOptions, IRequest, App, MiddlewareHandlerParams} from 'appolo';
import {ApolloServerExpressConfig, ServerRegistration} from 'apollo-server-express' ;
import {BuildSchemaOptions} from "type-graphql";
import {Context} from "./src/context";
import {Auth} from "./src/authChecker";
import {IMiddlewareCtr} from "appolo/lib/interfaces/IMiddleware";

export interface IOptions extends IModuleOptions {
    id?: string;
    context?: typeof Context
    auth?: typeof Auth,
    path?: string,
    middleware?: (((req: any, res: any, next: any) => void) | IMiddlewareCtr)[]
    apolloServerConfig?: Partial<Omit<ApolloServerExpressConfig, | "schema" | "context">>,
    serverRegistration?: Partial<Omit<ServerRegistration, "app" | "path|">>,
    buildSchemaOptions?: Partial<Omit<BuildSchemaOptions, "container">>
}
