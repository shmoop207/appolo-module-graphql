"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const class_transformer_1 = require("class-transformer");
const appolo_1 = require("appolo");
const recipe_type_1 = require("./recipe-type");
let RecipeService = class RecipeService {
    constructor() {
    }
    initialize() {
        this.autoIncrementValue = this.items.length;
    }
    async getAll() {
        return this.items;
    }
    async getOne(id) {
        return this.items.find(it => it.id === id);
    }
    async add(data) {
        const recipe = this.createRecipe(data);
        this.items.push(recipe);
        return recipe;
    }
    async findIndex(recipe) {
        return this.items.findIndex(it => it.id === recipe.id);
    }
    createRecipe(recipeData) {
        const recipe = class_transformer_1.plainToClass(recipe_type_1.Recipe, recipeData);
        recipe.id = this.getId();
        return recipe;
    }
    getId() {
        return (++this.autoIncrementValue).toString();
    }
};
tslib_1.__decorate([
    appolo_1.inject("data"),
    tslib_1.__metadata("design:type", Array)
], RecipeService.prototype, "items", void 0);
tslib_1.__decorate([
    appolo_1.initMethod(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], RecipeService.prototype, "initialize", null);
RecipeService = tslib_1.__decorate([
    appolo_1.define(),
    appolo_1.singleton(),
    tslib_1.__metadata("design:paramtypes", [])
], RecipeService);
exports.RecipeService = RecipeService;
//# sourceMappingURL=recipe-service.js.map