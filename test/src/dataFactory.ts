import {define,singleton,injectParam,inject, IFactory,factory} from "appolo";
import {sampleRecipes} from "./sample-recipes";

@define("data")
@singleton()
@factory()
export class DataFactory implements IFactory<any[]>{
    get(){
        return sampleRecipes.slice()
    }
}
