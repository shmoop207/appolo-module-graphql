import {Resolver, Query, FieldResolver, Arg, Root, Mutation, UseMiddleware, Ctx, Authorized,Register} from "../../index";
import {define, singleton, inject} from "@appolo/inject";

import {Recipe} from "./recipe-type";
import {RecipeService} from "./recipe-service";
import {RecipeInput} from "./recipe-input";
import {LogAccess} from "./logAccess";

@Resolver(of => Recipe)
@Register()
@singleton()
export class RecipeResolver {
    constructor() {
    }

    @inject() recipeService: RecipeService;

    @Query(returns => Recipe, {nullable: true})
    @UseMiddleware(LogAccess)
    async recipe(@Arg("recipeId") recipeId: string) {
        return this.recipeService.getOne(recipeId);
    }

    @Query(returns => Recipe, {nullable: true})
    @UseMiddleware(LogAccess)
    @Authorized("ADMIN", "MODERATOR")
    async recipeWithAuth(@Arg("recipeId") recipeId: string) {
        return this.recipeService.getOne(recipeId);
    }

    @Query(returns => [Recipe])
    async recipes(): Promise<Recipe[]> {
        return this.recipeService.getAll();
    }

    @Mutation(returns => Recipe)
    async addRecipe(@Arg("recipe") recipe: RecipeInput, @Ctx() context): Promise<Recipe> {
        return this.recipeService.add(recipe);
    }


    @FieldResolver()
    async numberInCollection(@Root() recipe: Recipe): Promise<number> {
        const index = await this.recipeService.findIndex(recipe);
        return index + 1;
    }

    @FieldResolver()
    contextParam(@Root() recipe: Recipe, @Ctx() context) {
        return context.test || ""
    }


}
