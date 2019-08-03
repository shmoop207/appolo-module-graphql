"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const appolo_1 = require("appolo");
const type_graphql_1 = require("type-graphql");
const apollo_server_express_1 = require("apollo-server-express");
const decorator_1 = require("./src/decorator");
const context_1 = require("./src/context");
const _ = require("lodash");
let GraphqlModule = class GraphqlModule extends appolo_1.Module {
    constructor(options) {
        super(options);
        this.Defaults = {
            id: "",
            path: "/graphql",
            serverRegistration: {},
            buildSchemaOptions: { nullableByDefault: true },
            apolloServerConfig: {}
        };
    }
    afterInitialize() {
        let $app = this.app;
        let modules = appolo_1.Util.findAllReflectData(decorator_1.ResolverKey, this.parent.exported);
        let resolvers = modules.map(item => item.fn);
        resolvers = _.filter(resolvers, resolver => appolo_1.Util.getReflectData(decorator_1.ResolverKey, resolver).path === this.moduleOptions.path);
        if (this.moduleOptions.buildSchemaOptions.resolvers) {
            resolvers = resolvers.concat(this.moduleOptions.buildSchemaOptions.resolvers);
        }
        let schemaOptions = Object.assign({}, this._moduleOptions.buildSchemaOptions, { resolvers: resolvers, container: {
                get(someClass, resolverData) {
                    return $app.parent.injector.get(someClass);
                }
            } });
        if (this.moduleOptions.auth) {
            schemaOptions.authChecker = (resolverData, roles) => {
                return $app.injector.get(this.moduleOptions.auth, [resolverData, roles]).check();
            };
        }
        const schema = type_graphql_1.buildSchemaSync(schemaOptions);
        let contextFn = this._moduleOptions.context || context_1.Context;
        const server = new apollo_server_express_1.ApolloServer(Object.assign({}, this._moduleOptions.apolloServerConfig, { schema, context: ({ req, res }) => $app.injector.get(contextFn, [req, res, $app]) }));
        let serverOptions = Object.assign({}, this.moduleOptions.serverRegistration, { app: this.rootParent, path: this.moduleOptions.path });
        _.forEach(this.moduleOptions.middleware, middleware => {
            this.rootParent.use(this.moduleOptions.path, middleware);
        });
        server.applyMiddleware(serverOptions);
    }
};
GraphqlModule = tslib_1.__decorate([
    appolo_1.module(),
    tslib_1.__metadata("design:paramtypes", [Object])
], GraphqlModule);
exports.GraphqlModule = GraphqlModule;
//# sourceMappingURL=graphqlModule.js.map