"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Register = exports.GraphqlModule = void 0;
const tslib_1 = require("tslib");
const graphqlModule_1 = require("./module/graphqlModule");
Object.defineProperty(exports, "GraphqlModule", { enumerable: true, get: function () { return graphqlModule_1.GraphqlModule; } });
const decorator_1 = require("./module/src/decorator");
Object.defineProperty(exports, "Register", { enumerable: true, get: function () { return decorator_1.Register; } });
tslib_1.__exportStar(require("type-graphql"), exports);
//# sourceMappingURL=index.js.map