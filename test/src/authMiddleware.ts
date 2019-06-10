import {define, singleton, injectParam, inject, IFactory, Middleware,NextFn} from "appolo";


@define()
@singleton()
export class AuthMiddleware extends Middleware {


    async run(req, res, next: NextFn) {
        req.user = {name: "test"};
         next();
    }
}
