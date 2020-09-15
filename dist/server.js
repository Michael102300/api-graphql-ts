"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const user_1 = require("./resolvers/user");
const recipe_1 = require("./resolvers/recipe");
const category_1 = require("./resolvers/category");
const PORT = 3000;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = express_1.default();
        yield typeorm_1.createConnection();
        const apolloServer = new apollo_server_express_1.ApolloServer({
            schema: yield type_graphql_1.buildSchema({
                resolvers: [
                    user_1.userResolver,
                    recipe_1.recipeResolver,
                    category_1.categoryResolver
                ],
                validate: false,
                authChecker: () => {
                    return true;
                },
                dateScalarMode: "isoDate"
            }),
            context: ({ req, res }) => ({ req, res })
        });
        apolloServer.applyMiddleware({ app, path: '/graphql' });
        app.listen(PORT, () => {
            console.log(`Server listening on PORT: ${PORT}`);
        });
        return app;
    });
}
main();
