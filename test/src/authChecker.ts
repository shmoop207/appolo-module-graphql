import {define, singleton, injectParam, inject, IFactory, Middleware, NextFn} from "appolo";
import {Auth} from "../../module/src/authChecker";


@define()
export class AuthChecker extends Auth<any> {


    async check() {
        return this.resolverData.context.req.user.name === "test" && this.roles.includes("ADMIN");
    }
}
