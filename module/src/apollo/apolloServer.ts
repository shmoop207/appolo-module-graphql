import corsMiddleware = require('cors');
import {json, OptionsJson} from 'body-parser';
import {IRequest, IResponse, NextFn} from '@appolo/route';
import {IApp} from '@appolo/core';
import {
    renderPlaygroundPage,
    RenderPageOptions as PlaygroundRenderPageOptions,
} from '@apollographql/graphql-playground-html';
import {
    GraphQLOptions,
    FileUploadOptions,
    ApolloServerBase,
    formatApolloErrors,
    processFileUploads,
    ContextFunction,
    Context,
    Config,
} from 'apollo-server-core';
import {ExecutionParams} from 'subscriptions-transport-ws';
import accepts = require('accepts');
import typeis = require('type-is');
import {graphqlExpress} from "./expressApollo";

export {GraphQLOptions, GraphQLExtension} from 'apollo-server-core';

export interface GetMiddlewareOptions {
    path?: string;
    app: IApp
    cors?: corsMiddleware.CorsOptions | corsMiddleware.CorsOptionsDelegate | boolean;
    bodyParserConfig?: OptionsJson | boolean;
    onHealthCheck?: (req: IRequest) => Promise<any>;
    disableHealthCheck?: boolean;
}

export interface ServerRegistration extends GetMiddlewareOptions {
    // Note: You can also pass a connect.Server here. If we changed this field to
    // `express.Application | connect.Server`, it would be very hard to get the
    // app.use calls to typecheck even though they do work properly. Our
    // assumption is that very few people use connect with TypeScript (and in fact
    // we suspect the only connect users left writing GraphQL apps are Meteor
    // users).
    app: IApp;
}

const fileUploadMiddleware = (
    uploadsConfig: FileUploadOptions,
    server: ApolloServerBase,
) => (
    req: IRequest,
    res: IResponse,
    next: NextFn,
) => {
    // Note: we use typeis directly instead of via req.is for connect support.
    if (
        typeof processFileUploads === 'function' &&
        typeis(req, ['multipart/form-data'])
    ) {
        processFileUploads(req, res, uploadsConfig)
            .then(body => {
                req.body = body;
                next();
            })
            .catch(error => {
                if (error.status && error.expose) {
                    res.status(error.status);
                }
                let errors = formatApolloErrors([error], {
                    formatter: server.requestOptions.formatError,
                    debug: server.requestOptions.debug,
                })

                next(Array.isArray(errors) ? errors[0] : errors as Error);
            });
    } else {
        next();
    }
};

export interface ExpressContext {
    req: IRequest;
    res: IResponse;
    connection?: ExecutionParams;
}

export interface ApolloServerExpressConfig extends Config {
    context?: ContextFunction<ExpressContext, Context> | Context;
}

export class ApolloServer extends ApolloServerBase {
    constructor(config: ApolloServerExpressConfig) {
        super(config);
    }

    // This translates the arguments from the middleware into graphQL options It
    // provides typings for the integration specific behavior, ideally this would
    // be propagated with a generic to the super class
    async createGraphQLServerOptions(
        req: IRequest,
        res: IResponse,
    ): Promise<GraphQLOptions> {
        return super.graphQLServerOptions({req, res});
    }

    protected supportsSubscriptions(): boolean {
        return true;
    }

    protected supportsUploads(): boolean {
        return true;
    }

    public applyMiddleware(opts: ServerRegistration) {
        this.getMiddleware(opts)
    }

    // TODO: While `express` is not Promise-aware, this should become `async` in
    // a major release in order to align the API with other integrations (e.g.
    // Hapi) which must be `async`.
    public getMiddleware({
                             app,
                             path,
                             cors,
                             bodyParserConfig,
                             disableHealthCheck,
                             onHealthCheck,
                         }: GetMiddlewareOptions) {
        if (!path) path = '/graphql';


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
                            res.json({status: 'pass'});
                        })
                        .catch(() => {
                            res.status(503).json({status: 'fail'});
                        });
                } else {
                    res.json({status: 'pass'});
                }
            });
        }

        let uploadsMiddleware;
        if (this.uploadsConfig && typeof processFileUploads === 'function') {
            uploadsMiddleware = fileUploadMiddleware(this.uploadsConfig, this);
        }

        // XXX multiple paths?
        this.graphqlPath = path;

        // Note that we don't just pass all of these handlers to a single app.use call
        // for 'connect' compatibility.
        if (cors === true) {
            app.route.use(path, corsMiddleware());
        } else if (cors !== false) {
            app.route.use(path, corsMiddleware(cors));
        }

        if (bodyParserConfig === true) {
            app.route.use(path, json());
        } else if (bodyParserConfig !== false) {
            app.route.use(path, json(bodyParserConfig));
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
                const types = accept.types() as string[];
                const prefersHTML =
                    types.find(
                        (x: string) => x === 'text/html' || x === 'application/json',
                    ) === 'text/html';

                if (prefersHTML) {
                    const playgroundRenderPageOptions: PlaygroundRenderPageOptions = {
                        endpoint: req.originalUrl,
                        subscriptionEndpoint: this.subscriptionsPath,
                        ...this.playgroundOptions,
                    };
                    res.setHeader('Content-Type', 'text/html');
                    const playground = renderPlaygroundPage(playgroundRenderPageOptions);
                    res.write(playground);
                    res.end();
                    return;
                }
            }

            return graphqlExpress(() => this.createGraphQLServerOptions(req, res))(
                req,
                res,
                next,
            );
        });


    }
}
