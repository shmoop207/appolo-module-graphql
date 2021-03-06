import { Field, ID, ObjectType, Int } from "type-graphql";
import { string} from "@appolo/validator";

@ObjectType()
export class Recipe {
    @Field(type => ID)
    id: string;

    @Field()

    title: string;

    @Field({ nullable: true })
    description?: string;

    @Field(type => [String])
    ingredients: string[];

    @Field(type => Int)
    protected numberInCollection: number;


    @Field(type => String)
    protected contextParam: string;

    @Field(type => Int)
    protected get ingredientsLength(): number {
        return this.ingredients.length;
    }
}
