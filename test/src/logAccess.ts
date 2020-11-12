import {define, singleton, inject, IFactory, factory} from "@appolo/inject";

import {
    Resolver,
    Query,
    FieldResolver,
    Arg,
    Root,
    Mutation,
    MiddlewareInterface,
    ResolverData,
    NextFn
} from "../../index";

@define()
@singleton()
export class LogAccess implements MiddlewareInterface<any> {

    @inject() env: any

    constructor(private readonly logger: any) {
    }

    async use({context, info}: ResolverData<any>, next: NextFn) {
        context.test = "aaaa";
        return next();
    }
}
