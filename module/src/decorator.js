"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const appolo_1 = require("appolo");
exports.ResolverKey = Symbol("resolver");
function Register(path = "/graphql") {
    return function (fn) {
        appolo_1.define()(fn);
        appolo_1.Util.getReflectData(exports.ResolverKey, fn, { path });
    };
}
exports.Register = Register;
//# sourceMappingURL=decorator.js.map