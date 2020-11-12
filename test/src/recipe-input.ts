import { Recipe } from "./recipe-type";
import { InputType, Field } from "type-graphql";
import {string} from "@appolo/validator";

@InputType()
export class RecipeInput implements Partial<Recipe> {
    @Field({ nullable: true })
    @string().optional()
    description: string;

    @Field(type => [String])
    ingredients: string[];

    @Field()
    title: string;
}
