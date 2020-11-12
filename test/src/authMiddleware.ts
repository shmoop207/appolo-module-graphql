import { Middleware,NextFn} from "@appolo/route";
import {define, singleton} from "@appolo/inject";


@define()
@singleton()
export class AuthMiddleware extends Middleware {


    async run(req, res, next: NextFn) {
        req.user = {name: "test"};
         next();
    }
}
