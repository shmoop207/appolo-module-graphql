"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApolloServer = exports.GraphQLExtension = void 0;
const corsMiddleware = require("cors");
const body_parser_1 = require("body-parser");
const graphql_playground_html_1 = require("@apollographql/graphql-playground-html");
const apollo_server_core_1 = require("apollo-server-core");
const accepts = require("accepts");
const typeis = require("type-is");
const expressApollo_1 = require("./expressApollo");
var apollo_server_core_2 = require("apollo-server-core");
Object.defineProperty(exports, "GraphQLExtension", { enumerable: true, get: function () { return apollo_server_core_2.GraphQLExtension; } });
const fileUploadMiddleware = (uploadsConfig, server) => (req, res, next) => {
    // Note: we use typeis directly instead of via req.is for connect support.
    if (typeof apollo_server_core_1.processFileUploads === 'function' &&
        typeis(req, ['multipart/form-data'])) {
        apollo_server_core_1.processFileUploads(req, res, uploadsConfig)
            .then(body => {
            req.body = body;
            next();
        })
            .catch(error => {
            if (error.status && error.expose) {
                res.status(error.status);
            }
            let errors = apollo_server_core_1.formatApolloErrors([error], {
                formatter: server.requestOptions.formatError,
                debug: server.requestOptions.debug,
            });
            next(Array.isArray(errors) ? errors[0] : errors);
        });
    }
    else {
        next();
    }
};
class ApolloServer extends apollo_server_core_1.ApolloServerBase {
    constructor(config) {
        super(config);
    }
    // This translates the arguments from the middleware into graphQL options It
    // provides typings for the integration specific behavior, ideally this would
    // be propagated with a generic to the super class
    async createGraphQLServerOptions(req, res) {
        return super.graphQLServerOptions({ req, res });
    }
    supportsSubscriptions() {
        return true;
    }
    supportsUploads() {
        return true;
    }
    applyMiddleware(opts) {
        this.getMiddleware(opts);
    }
    // TODO: While `express` is not Promise-aware, this should become `async` in
    // a major release in order to align the API with other integrations (e.g.
    // Hapi) which must be `async`.
    getMiddleware({ app, path, cors, bodyParserConfig, disableHealthCheck, onHealthCheck, }) {
        if (!path)
            path = '/graphql';
        const promiseWillStart = this.willStart();
        app.route.use(path, (_req, _res, next) => {
            promiseWillStart.then(() => next()).catch(next);
        });
        if (!disableHealthCheck) {
            app.route.use('/.well-known/apollo/server-health', (req, res) => {
                // Response follows https://tools.ietf.org/html/draft-inadarei-api-health-check-01
                res.type('application/health+json');
                if (onHealthCheck) {
                    onHealthCheck(req)
                        .then(() => {
                        res.json({ status: 'pass' });
                    })
                        .catch(() => {
                        res.status(503).json({ status: 'fail' });
                    });
                }
                else {
                    res.json({ status: 'pass' });
                }
            });
        }
        let uploadsMiddleware;
        if (this.uploadsConfig && typeof apollo_server_core_1.processFileUploads === 'function') {
            uploadsMiddleware = fileUploadMiddleware(this.uploadsConfig, this);
        }
        // XXX multiple paths?
        this.graphqlPath = path;
        // Note that we don't just pass all of these handlers to a single app.use call
        // for 'connect' compatibility.
        if (cors === true) {
            app.route.use(path, corsMiddleware());
        }
        else if (cors !== false) {
            app.route.use(path, corsMiddleware(cors));
        }
        if (bodyParserConfig === true) {
            app.route.use(path, body_parser_1.json());
        }
        else if (bodyParserConfig !== false) {
            app.route.use(path, body_parser_1.json(bodyParserConfig));
        }
        if (uploadsMiddleware) {
            app.route.use(path, uploadsMiddleware);
        }
        // Note: if you enable playground in production and expect to be able to see your
        // schema, you'll need to manually specify `introspection: true` in the
        // ApolloServer constructor; by default, the introspection query is only
        // enabled in dev.
        app.route.use(path, (req, res, next) => {
            if (this.playgroundOptions && req.method === 'GET') {
                // perform more expensive content-type check only if necessary
                // XXX We could potentially move this logic into the GuiOptions lambda,
                // but I don't think it needs any overriding
                const accept = accepts(req);
                const types = accept.types();
                const prefersHTML = types.find((x) => x === 'text/html' || x === 'application/json') === 'text/html';
                if (prefersHTML) {
                    const playgroundRenderPageOptions = Object.assign({ endpoint: req.originalUrl, subscriptionEndpoint: this.subscriptionsPath }, this.playgroundOptions);
                    res.setHeader('Content-Type', 'text/html');
                    const playground = graphql_playground_html_1.renderPlaygroundPage(playgroundRenderPageOptions);
                    res.write(playground);
                    res.end();
                    return;
                }
            }
            return expressApollo_1.graphqlExpress(() => this.createGraphQLServerOptions(req, res))(req, res, next);
        });
    }
}
exports.ApolloServer = ApolloServer;
//# sourceMappingURL=apolloServer.js.map