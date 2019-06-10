"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const appolo_1 = require("appolo");
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
    appolo_1.define(),
    tslib_1.__metadata("design:paramtypes", [Object, Object, appolo_1.App])
], Context);
exports.Context = Context;
//# sourceMappingURL=context.js.map