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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userResolver = void 0;
const type_graphql_1 = require("type-graphql");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../entity/user");
const isAuth_1 = require("../helper/auth/isAuth");
const SignUp_1 = require("./inputs/user/SignUp");
const Login_1 = require("./inputs/user/Login");
let userResolver = class userResolver {
    user({ payload }) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(payload === null || payload === void 0 ? void 0 : payload.email)) {
                    throw new Error('Access denied!');
                }
                const user = yield user_1.User.findOne({ email: payload === null || payload === void 0 ? void 0 : payload.email });
                if (!user) {
                    throw new Error('User not found');
                }
                return user;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    signup(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_1.User.findOne({ email: input.email });
                if (user) {
                    throw new Error('Email already in use');
                }
                const hashedPassword = yield bcryptjs_1.default.hash(input.password, 12);
                const newUser = yield user_1.User.create(Object.assign(Object.assign({}, input), { password: hashedPassword }));
                const result = yield newUser.save();
                return result;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
    login(input) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_1.User.findOne({ email: input.email });
                console.log(user);
                if (!user) {
                    throw new Error(`User don't found`);
                }
                const isPasswordValid = yield bcryptjs_1.default.compare(input.password, user.password);
                if (!isPasswordValid) {
                    throw new Error('Incorrect password');
                }
                const secret = process.env.JWT_SECRET_KEY || 'mysecretkey';
                const token = jsonwebtoken_1.default.sign({ email: user.email }, secret, { expiresIn: '1d' });
                return token;
            }
            catch (error) {
                console.log(error);
                throw error;
            }
        });
    }
};
__decorate([
    type_graphql_1.Query(() => user_1.User),
    type_graphql_1.UseMiddleware(isAuth_1.isAuth),
    __param(0, type_graphql_1.Ctx()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], userResolver.prototype, "user", null);
__decorate([
    type_graphql_1.Mutation(() => user_1.User),
    __param(0, type_graphql_1.Arg("input", () => SignUp_1.signupInput)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [SignUp_1.signupInput]),
    __metadata("design:returntype", Promise)
], userResolver.prototype, "signup", null);
__decorate([
    type_graphql_1.Mutation(() => String),
    __param(0, type_graphql_1.Arg("input", () => Login_1.loginInput)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Login_1.loginInput]),
    __metadata("design:returntype", Promise)
], userResolver.prototype, "login", null);
userResolver = __decorate([
    type_graphql_1.Resolver()
], userResolver);
exports.userResolver = userResolver;
