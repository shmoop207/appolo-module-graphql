"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthMiddleware = void 0;
const tslib_1 = require("tslib");
const route_1 = require("@appolo/route");
const inject_1 = require("@appolo/inject");
let AuthMiddleware = class AuthMiddleware extends route_1.Middleware {
    async run(req, res, next) {
        req.user = { name: "test" };
        next();
    }
};
AuthMiddleware = tslib_1.__decorate([
    inject_1.define(),
    inject_1.singleton()
], AuthMiddleware);
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=authMiddleware.js.map