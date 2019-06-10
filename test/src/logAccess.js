"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const appolo_1 = require("appolo");
let LogAccess = class LogAccess {
    constructor(logger) {
        this.logger = logger;
    }
    async use({ context, info }, next) {
        context.test = "aaaa";
        return next();
    }
};
tslib_1.__decorate([
    appolo_1.inject(),
    tslib_1.__metadata("design:type", Object)
], LogAccess.prototype, "env", void 0);
LogAccess = tslib_1.__decorate([
    appolo_1.define(),
    appolo_1.singleton(),
    tslib_1.__metadata("design:paramtypes", [Object])
], LogAccess);
exports.LogAccess = LogAccess;
//# sourceMappingURL=logAccess.js.map