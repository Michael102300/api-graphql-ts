"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.recipeResolver = void 0;
const type_graphql_1 = require("type-graphql");
const user_1 = require("../entity/user");
const recipe_1 = require("../entity/recipe");
const category_1 = require("../entity/category");
const createRecipe_1 = require("./inputs/recipe/createRecipe");
const updateRecipe_1 = require("./inputs/recipe/updateRecipe");
const isAuth_1 = require("../helper/auth/isAuth");
let recipeResolver = class recipeResolver {
    getRecipes({ payload }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_1.User.findOne({ email: payload === null || payload === void 0 ? void 0 : payload.email });
                if (!user) {
                    throw new Error('Access denied');
                }
                ;
                const recipes = yield recipe_1.Recipe.find();
                return recipes;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    getOneRecipe({ payload }, name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_1.User.findOne({ email: payload === null || payload === void 0 ? void 0 : payload.email });
                if (!user) {
                    throw new Error('Access denied');
                }
                ;
                const recipe = yield recipe_1.Recipe.findOne({ name });
                return recipe;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    getMyRecipes({ payload }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_1.User.findOne({ email: payload === null || payload === void 0 ? void 0 : payload.email });
                if (!user) {
                    throw new Error('Access denied');
                }
                ;
                const recipes = yield recipe_1.Recipe.find({ user: user });
                return recipes;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    createRecipe({ payload }, input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_1.User.findOne({ email: payload === null || payload === void 0 ? void 0 : payload.email });
                if (!user) {
                    throw new Error('Access denied');
                }
                ;
                const category = yield category_1.Category.findOne({ name: input.category });
                const newRecipe = yield recipe_1.Recipe.create({
                    name: input.name,
                    description: input.description,
                    ingredients: input.ingredients,
                    user: user,
                    category: category
                });
                const result = yield newRecipe.save();
                return result;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    updateRecipe({ payload }, id, input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_1.User.findOne({ email: payload === null || payload === void 0 ? void 0 : payload.email });
                if (!user) {
                    throw new Error('Access denied');
                }
                ;
                const recipe = yield recipe_1.Recipe.findOne({ id: id });
                if (recipe.user.id !== user.id) {
                    throw new Error('Not authorized');
                }
                const result = yield recipe_1.Recipe.update({ id }, {
                    name: input.name,
                    description: input.description,
                    ingredients: input.ingredients
                });
                return result;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    deleteRecipe({ payload }, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_1.User.findOne({ email: payload === null || payload === void 0 ? void 0 : payload.email });
                if (!user) {
                    throw new Error('Access denied');
                }
                ;
                const recipe = yield recipe_1.Recipe.findOne({ id: id });
                if (recipe.user.id !== user.id) {
                    throw new Error('Not authorized');
                }
                yield recipe_1.Recipe.delete(id);
                return "Recipe successfully deleted";
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
};
__decorate([
    type_graphql_1.Query(() => [recipe_1.Recipe], { nullable: true }),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], recipeResolver.prototype, "getRecipes", null);
__decorate([
    type_graphql_1.Query(() => recipe_1.Recipe, { nullable: true }),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg("name", () => String)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], recipeResolver.prototype, "getOneRecipe", null);
__decorate([
    type_graphql_1.Query(() => [recipe_1.Recipe], { nullable: true }),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], recipeResolver.prototype, "getMyRecipes", null);
__decorate([
    type_graphql_1.Mutation(() => recipe_1.Recipe),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg("input", () => createRecipe_1.createRecipeInput)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, createRecipe_1.createRecipeInput]),
    __metadata("design:returntype", Promise)
], recipeResolver.prototype, "createRecipe", null);
__decorate([
    type_graphql_1.Mutation(() => recipe_1.Recipe),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __param(2, type_graphql_1.Arg("input", () => updateRecipe_1.updateRecipeInput)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, updateRecipe_1.updateRecipeInput]),
    __metadata("design:returntype", Promise)
], recipeResolver.prototype, "updateRecipe", null);
__decorate([
    type_graphql_1.Mutation(() => String),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg("id", () => type_graphql_1.ID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], recipeResolver.prototype, "deleteRecipe", null);
recipeResolver = __decorate([
    type_graphql_1.Resolver()
], recipeResolver);
exports.recipeResolver = recipeResolver;
