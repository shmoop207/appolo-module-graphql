"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthChecker = void 0;
const tslib_1 = require("tslib");
const inject_1 = require("@appolo/inject");
const authChecker_1 = require("../../module/src/authChecker");
let AuthChecker = class AuthChecker extends authChecker_1.Auth {
    async check() {
        return this.resolverData.context.req.user.name === "test" && this.roles.includes("ADMIN");
    }
};
AuthChecker = tslib_1.__decorate([
    inject_1.define()
], AuthChecker);
exports.AuthChecker = AuthChecker;
//# sourceMappingURL=authChecker.js.map