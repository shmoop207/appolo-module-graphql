import { plainToClass } from "class-transformer";
import {define,singleton,injectParam,inject,initMethod } from "appolo";

import { Recipe } from "./recipe-type";
import { RecipeInput } from "./recipe-input";

@define()
@singleton()
export class RecipeService {
    private autoIncrementValue: number;

    @inject("data") private readonly items: Recipe[];

    constructor() {

    }
    @initMethod()
    initialize(){
        this.autoIncrementValue = this.items.length;
    }



    async getAll() {
        return this.items;
    }

    async getOne(id: string) {
        return this.items.find(it => it.id === id);
    }

    async add(data: RecipeInput) {
        const recipe = this.createRecipe(data);
        this.items.push(recipe);
        return recipe;
    }

    async findIndex(recipe: Recipe) {
        return this.items.findIndex(it => it.id === recipe.id);
    }

    private createRecipe(recipeData: Partial<Recipe>): Recipe {
        const recipe = plainToClass(Recipe, recipeData);
        recipe.id = this.getId();
        return recipe;
    }

    private getId(): string {
        return (++this.autoIncrementValue).toString();
    }
}
