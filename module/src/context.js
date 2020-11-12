"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Context = void 0;
const tslib_1 = require("tslib");
const inject_1 = require("@appolo/inject");
const core_1 = require("@appolo/core");
let Context = class Context {
    constructor(_req, _res, _app) {
        this._req = _req;
        this._res = _res;
        this._app = _app;
    }
    get app() {
        return this._app;
    }
    get injector() {
        return this._app.injector;
    }
    get req() {
        return this._req;
    }
    get res() {
        return this._res;
    }
};
Context = tslib_1.__decorate([
    inject_1.define(),
    tslib_1.__metadata("design:paramtypes", [Object, Object, core_1.App])
], Context);
exports.Context = Context;
//# sourceMappingURL=context.js.map