"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const type_graphql_1 = require("type-graphql");
let Recipe = class Recipe {
    get ingredientsLength() {
        return this.ingredients.length;
    }
};
tslib_1.__decorate([
    type_graphql_1.Field(type => type_graphql_1.ID),
    tslib_1.__metadata("design:type", String)
], Recipe.prototype, "id", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], Recipe.prototype, "title", void 0);
tslib_1.__decorate([
    type_graphql_1.Field({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], Recipe.prototype, "description", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(type => [String]),
    tslib_1.__metadata("design:type", Array)
], Recipe.prototype, "ingredients", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(type => type_graphql_1.Int),
    tslib_1.__metadata("design:type", Number)
], Recipe.prototype, "numberInCollection", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(type => String),
    tslib_1.__metadata("design:type", String)
], Recipe.prototype, "contextParam", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(type => type_graphql_1.Int),
    tslib_1.__metadata("design:type", Number),
    tslib_1.__metadata("design:paramtypes", [])
], Recipe.prototype, "ingredientsLength", null);
Recipe = tslib_1.__decorate([
    type_graphql_1.ObjectType()
], Recipe);
exports.Recipe = Recipe;
//# sourceMappingURL=recipe-type.js.map