"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sampleRecipes = void 0;
const class_transformer_1 = require("class-transformer");
const recipe_type_1 = require("./recipe-type");
exports.sampleRecipes = [
    createRecipe({
        id: "1",
        title: "Recipe 1",
        description: "Desc 1",
        ingredients: ["one", "two", "three"],
    }),
    createRecipe({
        id: "2",
        title: "Recipe 2",
        description: "Desc 2",
        ingredients: ["four", "five", "six"],
    }),
    createRecipe({
        id: "3",
        title: "Recipe 3",
        ingredients: ["seven", "eight", "nine"],
    }),
];
function createRecipe(recipeData) {
    return class_transformer_1.plainToClass(recipe_type_1.Recipe, recipeData);
}
//# sourceMappingURL=sample-recipes.js.map