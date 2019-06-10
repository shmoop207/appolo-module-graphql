import "reflect-metadata";
import {define, Util} from 'appolo';


export const ResolverKey = Symbol("resolver");

export function Register(path: string = "/graphql"): ClassDecorator {
    return function (fn: any) {
        define()(fn);
        Util.getReflectData<{ path?: string }>(ResolverKey, fn, {path});
    }
}
