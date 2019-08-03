import {module, Module, Util, App} from "appolo";
import {IOptions} from "./IOptions";
import {buildSchema, BuildSchemaOptions, buildSchemaSync, ResolverData} from "type-graphql";
import {ApolloServer, ServerRegistration} from 'apollo-server-express' ;
import {ResolverKey} from "./src/decorator";
import {Context} from "./src/context";
import {Auth} from "./src/authChecker";
import _ = require("lodash");

@module()
export class GraphqlModule extends Module<IOptions> {

    constructor(options?: IOptions) {
        super(options)
    }

    protected readonly Defaults: Partial<IOptions> = {
        id: "",
        path: "/graphql",
        serverRegistration: {},
        buildSchemaOptions: {nullableByDefault: true},
        apolloServerConfig: {}
    };

    protected afterInitialize() {

        let $app = this.app as App;

        let modules = Util.findAllReflectData<string>(ResolverKey, this.parent.exported);

        let resolvers = modules.map(item => item.fn);
        resolvers = _.filter(resolvers, resolver => Util.getReflectData<{ path: string }>(ResolverKey, resolver).path === this.moduleOptions.path)

        if (this.moduleOptions.buildSchemaOptions.resolvers) {
            resolvers = resolvers.concat(this.moduleOptions.buildSchemaOptions.resolvers as Function[])
        }

        let schemaOptions: BuildSchemaOptions = {
            ...this._moduleOptions.buildSchemaOptions,
            resolvers: resolvers,
            container: {
                get(someClass: any, resolverData: ResolverData<any>): any {
                    return $app.parent.injector.get(someClass)
                }
            }
        };

        if (this.moduleOptions.auth) {
            schemaOptions.authChecker = (resolverData: ResolverData<Context>, roles: string[]) => {
                return $app.injector.get<Auth<any>>(this.moduleOptions.auth, [resolverData, roles]).check()
            }
        }

        const schema = buildSchemaSync(schemaOptions);

        let contextFn = this._moduleOptions.context || Context;

        const server = new ApolloServer({
            ...this._moduleOptions.apolloServerConfig,
            schema,
            context: ({req, res}) => $app.injector.get(contextFn, [req, res, $app])
        });

        let serverOptions: ServerRegistration = {
            ...this.moduleOptions.serverRegistration,
            app: this.rootParent,
            path: this.moduleOptions.path
        };

        _.forEach(this.moduleOptions.middleware, middleware => {
            (this.rootParent as App).use(this.moduleOptions.path, middleware)
        });

        server.applyMiddleware(serverOptions);

    }

}
