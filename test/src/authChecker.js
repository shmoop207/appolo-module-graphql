"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const appolo_1 = require("appolo");
const authChecker_1 = require("../../module/src/authChecker");
let AuthChecker = class AuthChecker extends authChecker_1.Auth {
    async check() {
        return this.resolverData.context.req.user.name === "test" && this.roles.includes("ADMIN");
    }
};
AuthChecker = tslib_1.__decorate([
    appolo_1.define()
], AuthChecker);
exports.AuthChecker = AuthChecker;
//# sourceMappingURL=authChecker.js.map