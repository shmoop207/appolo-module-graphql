"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const appolo_1 = require("appolo");
const sample_recipes_1 = require("./sample-recipes");
let DataFactory = class DataFactory {
    get() {
        return sample_recipes_1.sampleRecipes.slice();
    }
};
DataFactory = tslib_1.__decorate([
    appolo_1.define("data"),
    appolo_1.singleton(),
    appolo_1.factory()
], DataFactory);
exports.DataFactory = DataFactory;
//# sourceMappingURL=dataFactory.js.map