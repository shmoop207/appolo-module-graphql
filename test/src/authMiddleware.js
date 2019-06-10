"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const appolo_1 = require("appolo");
let AuthMiddleware = class AuthMiddleware extends appolo_1.Middleware {
    async run(req, res, next) {
        req.user = { name: "test" };
        next();
    }
};
AuthMiddleware = tslib_1.__decorate([
    appolo_1.define(),
    appolo_1.singleton()
], AuthMiddleware);
exports.AuthMiddleware = AuthMiddleware;
//# sourceMappingURL=authMiddleware.js.map