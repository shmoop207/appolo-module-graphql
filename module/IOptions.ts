import { Middleware} from '@appolo/route/index';
import {BuildSchemaOptions} from "type-graphql";
import {Context} from "./src/context";
import {Auth} from "./src/authChecker";
import {ApolloServerExpressConfig, ServerRegistration} from "./src/apollo/apolloServer";

export interface IOptions  {
    id?: string;
    context?: typeof Context
    auth?: typeof Auth,
    path?: string,
    middleware?: (((req: any, res: any, next: any) => void) | typeof Middleware)[]
    apolloServerConfig?: Partial<Omit<ApolloServerExpressConfig, | "schema" | "context">>,
    serverRegistration?: Partial<Omit<ServerRegistration, "app" | "path|">>,
    buildSchemaOptions?: Partial<Omit<BuildSchemaOptions, "container">>
}
