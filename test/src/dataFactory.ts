import {define,singleton,inject, IFactory,factory} from "@appolo/inject";
import {sampleRecipes} from "./sample-recipes";

@define("data")
@singleton()
@factory()
export class DataFactory implements IFactory<any[]>{
    get(){
        return sampleRecipes.slice()
    }
}
