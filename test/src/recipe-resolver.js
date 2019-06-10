"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = require("../../index");
const appolo_1 = require("appolo");
const recipe_type_1 = require("./recipe-type");
const recipe_service_1 = require("./recipe-service");
const recipe_input_1 = require("./recipe-input");
const logAccess_1 = require("./logAccess");
let RecipeResolver = class RecipeResolver {
    constructor() {
    }
    async recipe(recipeId) {
        return this.recipeService.getOne(recipeId);
    }
    async recipeWithAuth(recipeId) {
        return this.recipeService.getOne(recipeId);
    }
    async recipes() {
        return this.recipeService.getAll();
    }
    async addRecipe(recipe, context) {
        return this.recipeService.add(recipe);
    }
    async numberInCollection(recipe) {
        const index = await this.recipeService.findIndex(recipe);
        return index + 1;
    }
    contextParam(recipe, context) {
        return context.test || "";
    }
};
tslib_1.__decorate([
    appolo_1.inject(),
    tslib_1.__metadata("design:type", recipe_service_1.RecipeService)
], RecipeResolver.prototype, "recipeService", void 0);
tslib_1.__decorate([
    index_1.Query(returns => recipe_type_1.Recipe, { nullable: true }),
    index_1.UseMiddleware(logAccess_1.LogAccess),
    tslib_1.__param(0, index_1.Arg("recipeId")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], RecipeResolver.prototype, "recipe", null);
tslib_1.__decorate([
    index_1.Query(returns => recipe_type_1.Recipe, { nullable: true }),
    index_1.UseMiddleware(logAccess_1.LogAccess),
    index_1.Authorized("ADMIN", "MODERATOR"),
    tslib_1.__param(0, index_1.Arg("recipeId")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], RecipeResolver.prototype, "recipeWithAuth", null);
tslib_1.__decorate([
    index_1.Query(returns => [recipe_type_1.Recipe]),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], RecipeResolver.prototype, "recipes", null);
tslib_1.__decorate([
    index_1.Mutation(returns => recipe_type_1.Recipe),
    tslib_1.__param(0, index_1.Arg("recipe")), tslib_1.__param(1, index_1.Ctx()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [recipe_input_1.RecipeInput, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], RecipeResolver.prototype, "addRecipe", null);
tslib_1.__decorate([
    index_1.FieldResolver(),
    tslib_1.__param(0, index_1.Root()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [recipe_type_1.Recipe]),
    tslib_1.__metadata("design:returntype", Promise)
], RecipeResolver.prototype, "numberInCollection", null);
tslib_1.__decorate([
    index_1.FieldResolver(),
    tslib_1.__param(0, index_1.Root()), tslib_1.__param(1, index_1.Ctx()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [recipe_type_1.Recipe, Object]),
    tslib_1.__metadata("design:returntype", void 0)
], RecipeResolver.prototype, "contextParam", null);
RecipeResolver = tslib_1.__decorate([
    index_1.Resolver(of => recipe_type_1.Recipe),
    index_1.Register(),
    appolo_1.singleton(),
    tslib_1.__metadata("design:paramtypes", [])
], RecipeResolver);
exports.RecipeResolver = RecipeResolver;
//# sourceMappingURL=recipe-resolver.js.map