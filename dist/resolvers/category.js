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
exports.categoryResolver = void 0;
const type_graphql_1 = require("type-graphql");
const user_1 = require("../entity/user");
const category_1 = require("../entity/category");
const createCategory_1 = require("./inputs/category/createCategory");
const updateCategory_1 = require("./inputs/category/updateCategory");
const isAuth_1 = require("../helper/auth/isAuth");
let categoryResolver = class categoryResolver {
    getCategories({ payload }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_1.User.findOne({ email: payload === null || payload === void 0 ? void 0 : payload.email });
                if (!user) {
                    throw new Error('Access denied');
                }
                ;
                const categories = yield category_1.Category.find();
                return categories;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    getOneCategory(name, { payload }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_1.User.findOne({ email: payload === null || payload === void 0 ? void 0 : payload.email });
                if (!user) {
                    throw new Error('Access denied');
                }
                ;
                const category = yield category_1.Category.findOne({ name });
                return category;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    createCategory(input, { payload }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_1.User.findOne({ email: payload === null || payload === void 0 ? void 0 : payload.email });
                if (!user) {
                    throw new Error('Access denied');
                }
                ;
                const category = yield category_1.Category.findOne({ name: input.name });
                if (category) {
                    throw new Error('Category already exists');
                }
                const newCategory = yield category_1.Category.create(Object.assign({}, input));
                const result = newCategory.save();
                return result;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    updateCategory(id, input, { payload }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_1.User.findOne({ email: payload === null || payload === void 0 ? void 0 : payload.email });
                if (!user) {
                    throw new Error('Access denied');
                }
                ;
                const result = yield category_1.Category.update({ id }, input);
                return result;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    deleteCategory({ payload }, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_1.User.findOne({ email: payload === null || payload === void 0 ? void 0 : payload.email });
                if (!user) {
                    throw new Error('Access denied');
                }
                ;
                yield category_1.Category.delete(id);
                return "Category successfully deleted";
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
};
__decorate([
    type_graphql_1.Query(() => [category_1.Category], { nullable: true }),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], categoryResolver.prototype, "getCategories", null);
__decorate([
    type_graphql_1.Query(() => category_1.Category, { nullable: true }),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg("name", () => String)),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], categoryResolver.prototype, "getOneCategory", null);
__decorate([
    type_graphql_1.Mutation(() => category_1.Category),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg("input", () => createCategory_1.createCategoryInput)),
    __param(1, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [createCategory_1.createCategoryInput, Object]),
    __metadata("design:returntype", Promise)
], categoryResolver.prototype, "createCategory", null);
__decorate([
    type_graphql_1.Mutation(() => category_1.Category),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Arg("id", () => type_graphql_1.Int)),
    __param(1, type_graphql_1.Arg("input", () => updateCategory_1.updateCategoryInput)),
    __param(2, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, updateCategory_1.updateCategoryInput, Object]),
    __metadata("design:returntype", Promise)
], categoryResolver.prototype, "updateCategory", null);
__decorate([
    type_graphql_1.Mutation(() => String),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Ctx()),
    __param(1, type_graphql_1.Arg("id", () => type_graphql_1.ID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number]),
    __metadata("design:returntype", Promise)
], categoryResolver.prototype, "deleteCategory", null);
categoryResolver = __decorate([
    type_graphql_1.Resolver()
], categoryResolver);
exports.categoryResolver = categoryResolver;
