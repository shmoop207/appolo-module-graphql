"use strict";
var GraphqlModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphqlModule = void 0;
const tslib_1 = require("tslib");
const engine_1 = require("@appolo/engine");
const type_graphql_1 = require("type-graphql");
const decorator_1 = require("./src/decorator");
const context_1 = require("./src/context");
const utils_1 = require("@appolo/utils");
const _ = require("lodash");
const apolloServer_1 = require("./src/apollo/apolloServer");
let GraphqlModule = GraphqlModule_1 = class GraphqlModule extends engine_1.Module {
    constructor() {
        super(...arguments);
        this.Defaults = {
            id: "",
            path: "/graphql",
            serverRegistration: {},
            buildSchemaOptions: { nullableByDefault: true },
            apolloServerConfig: {}
        };
    }
    static for(options) {
        return { type: GraphqlModule_1, options };
    }
    afterModuleInitialize() {
        let $app = this.app;
        let modules = this.app.tree.parent.discovery.findAllReflectData(decorator_1.ResolverKey);
        let resolvers = modules.map(item => item.fn);
        resolvers = _.filter(resolvers, resolver => utils_1.Reflector.getFnMetadata(decorator_1.ResolverKey, resolver).path === this.moduleOptions.path);
        if (this.moduleOptions.buildSchemaOptions.resolvers) {
            resolvers = resolvers.concat(this.moduleOptions.buildSchemaOptions.resolvers);
        }
        let schemaOptions = Object.assign(Object.assign({}, this._moduleOptions.buildSchemaOptions), { resolvers: resolvers, container: {
                get(someClass, resolverData) {
                    return $app.tree.parent.injector.get(someClass);
                }
            } });
        if (this.moduleOptions.auth) {
            schemaOptions.authChecker = (resolverData, roles) => {
                return $app.injector.get(this.moduleOptions.auth, [resolverData, roles]).check();
            };
        }
        const schema = type_graphql_1.buildSchemaSync(schemaOptions);
        let contextFn = this._moduleOptions.context || context_1.Context;
        const server = new apolloServer_1.ApolloServer(Object.assign(Object.assign({}, this._moduleOptions.apolloServerConfig), { schema, context: ({ req, res }) => $app.injector.get(contextFn, [req, res, $app]) }));
        let serverOptions = Object.assign(Object.assign({}, this.moduleOptions.serverRegistration), { app: this.rootParent, path: this.moduleOptions.path });
        _.forEach(this.moduleOptions.middleware, middleware => {
            this.rootParent.route.use(this.moduleOptions.path, middleware);
        });
        server.applyMiddleware(serverOptions);
    }
};
GraphqlModule = GraphqlModule_1 = tslib_1.__decorate([
    engine_1.module()
], GraphqlModule);
exports.GraphqlModule = GraphqlModule;
//# sourceMappingURL=graphqlModule.js.map