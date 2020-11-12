"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataFactory = void 0;
const tslib_1 = require("tslib");
const inject_1 = require("@appolo/inject");
const sample_recipes_1 = require("./sample-recipes");
let DataFactory = class DataFactory {
    get() {
        return sample_recipes_1.sampleRecipes.slice();
    }
};
DataFactory = tslib_1.__decorate([
    inject_1.define("data"),
    inject_1.singleton(),
    inject_1.factory()
], DataFactory);
exports.DataFactory = DataFactory;
//# sourceMappingURL=dataFactory.js.map