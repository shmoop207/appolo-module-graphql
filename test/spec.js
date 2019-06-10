"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const appolo_1 = require("appolo");
const index_1 = require("../index");
const chai = require("chai");
const request = require("supertest");
const sinonChai = require("sinon-chai");
const authMiddleware_1 = require("./src/authMiddleware");
const authChecker_1 = require("./src/authChecker");
require('chai').should();
chai.use(sinonChai);
let app;
describe("redis module Spec", function () {
    beforeEach(async () => {
        app = appolo_1.createApp({ root: __dirname, environment: "production", port: 8181 });
        await app.module(new index_1.GraphqlModule({
            middleware: [authMiddleware_1.AuthMiddleware],
            auth: authChecker_1.AuthChecker,
            buildSchemaOptions: { validate: false }
        }));
        await app.launch();
    });
    afterEach(async () => {
        await app.reset();
    });
    it("should get recipe by id", async () => {
        let query = `query GetRecipe1 {
                        recipe(recipeId: "1") {
                        title
                        description
                        ingredients
                        numberInCollection
            }
        }`;
        let res = await request(app.handle).post("/graphql").send({ query: query });
        res.body.data.recipe.title.should.be.eq("Recipe 1");
        res.body.data.recipe.description.should.be.eq("Desc 1");
        res.body.data.recipe.ingredients.length.should.be.eq(3);
        res.body.data.recipe.numberInCollection.should.be.eq(1);
    });
    it("should get all recipes", async () => {
        let query = `query GetRecipes {
                        recipes {
                            title
                            description
                            ingredientsLength
                            numberInCollection
                        }
                    }`;
        let res = await request(app.handle).post("/graphql").send({ query: query });
        res.body.data.recipes.length.should.be.eq(3);
        res.body.data.recipes[1].title.should.be.eq("Recipe 2");
        res.body.data.recipes[1].description.should.be.eq("Desc 2");
        res.body.data.recipes[1].ingredientsLength.should.be.eq(3);
        res.body.data.recipes[1].numberInCollection.should.be.eq(2);
    });
    it("should add Recipe", async () => {
        let query = `mutation AddRecipe {
                        addRecipe(recipe: {
                            title: "New recipe",
                            ingredients: [
                                "One",
                                "Two",
                                "Three",
                            ],
                        }) {id numberInCollection title}
                    }`;
        let res = await request(app.handle).post("/graphql").send({ query: query });
        res.body.data.addRecipe.title.should.be.eq("New recipe");
        res.body.data.addRecipe.numberInCollection.should.be.eq(4);
        res.body.data.addRecipe.id.should.be.eq("4");
    });
    it("should get  context", async () => {
        let query = `query GetRecipe1 {
                        recipe(recipeId: "1") {
                        contextParam
                    
            }
        }`;
        let res = await request(app.handle).post("/graphql").send({ query: query });
        res.body.data.recipe.contextParam.should.be.eq("aaaa");
    });
    it("should get recipe with auth", async () => {
        let query = `query GetRecipe2 {
                        recipeWithAuth(recipeId: "1") {
                        contextParam
                    
            }
        }`;
        let res = await request(app.handle).post("/graphql").send({ query: query });
        res.body.data.recipeWithAuth.contextParam.should.be.eq("aaaa");
    });
});
//# sourceMappingURL=spec.js.map