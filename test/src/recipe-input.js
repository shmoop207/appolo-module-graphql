"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const type_graphql_1 = require("type-graphql");
let RecipeInput = class RecipeInput {
};
tslib_1.__decorate([
    type_graphql_1.Field({ nullable: true }),
    tslib_1.__metadata("design:type", String)
], RecipeInput.prototype, "description", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(type => [String]),
    tslib_1.__metadata("design:type", Array)
], RecipeInput.prototype, "ingredients", void 0);
tslib_1.__decorate([
    type_graphql_1.Field(),
    tslib_1.__metadata("design:type", String)
], RecipeInput.prototype, "title", void 0);
RecipeInput = tslib_1.__decorate([
    type_graphql_1.InputType()
], RecipeInput);
exports.RecipeInput = RecipeInput;
//# sourceMappingURL=recipe-input.js.map