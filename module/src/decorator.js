"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Register = exports.ResolverKey = void 0;
require("reflect-metadata");
const inject_1 = require("@appolo/inject");
exports.ResolverKey = Symbol("resolver");
function Register(path = "/graphql") {
    return function (fn) {
        inject_1.define()(fn);
        inject_1.Util.getReflectData(exports.ResolverKey, fn, { path });
    };
}
exports.Register = Register;
//# sourceMappingURL=decorator.js.map