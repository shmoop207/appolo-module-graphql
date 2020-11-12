import {module, Module,IModuleParams} from "@appolo/engine";
import {IOptions} from "./IOptions";
import {App} from "@appolo/core";
import {buildSchema, BuildSchemaOptions, buildSchemaSync, ResolverData} from "type-graphql";
import {ResolverKey} from "./src/decorator";
import {Context} from "./src/context";
import {Reflector} from "@appolo/utils";
import {Auth} from "./src/authChecker";
import _ = require("lodash");
import {ApolloServer, ServerRegistration} from "./src/apollo/apolloServer";

@module()
export class GraphqlModule extends Module<IOptions> {

    public static for(options:IOptions):IModuleParams{
        return {type:GraphqlModule,options}
    }


    protected readonly Defaults: Partial<IOptions> = {
        id: "",
        path: "/graphql",
        serverRegistration: {},
        buildSchemaOptions: {nullableByDefault: true},
        apolloServerConfig: {}
    };

    public afterModuleInitialize() {

        let $app = this.app as App;

        let modules = this.app.tree.parent.discovery.findAllReflectData<string>(ResolverKey);

        let resolvers = modules.map(item => item.fn);
        resolvers = _.filter(resolvers, resolver => Reflector.getFnMetadata<{ path: string }>(ResolverKey, resolver).path === this.moduleOptions.path)

        if (this.moduleOptions.buildSchemaOptions.resolvers) {
            resolvers = resolvers.concat(this.moduleOptions.buildSchemaOptions.resolvers as Function[])
        }

        let schemaOptions: BuildSchemaOptions = {
            ...this._moduleOptions.buildSchemaOptions,
            resolvers: resolvers as any,
            container: {
                get(someClass: any, resolverData: ResolverData<any>): any {
                    return $app.tree.parent.injector.get(someClass)
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
            app: this.rootParent as App,
            path: this.moduleOptions.path
        };

        _.forEach(this.moduleOptions.middleware, middleware => {
            (this.rootParent as App).route.use(this.moduleOptions.path, middleware)
        });

        server.applyMiddleware(serverOptions);

    }

}
