import {App, IRequest, IResponse, Injector, define} from 'appolo';
import {AuthChecker, ResolverData} from "type-graphql";
import {Context} from "./context";

export abstract class Auth<T extends Context> {
    protected constructor(protected resolverData: ResolverData<T>, protected roles: string[]) {

    }

    public abstract check(): boolean | Promise<boolean>

}
