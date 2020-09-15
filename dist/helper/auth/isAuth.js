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
exports.isAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_1 = require("../../entity/user");
exports.isAuth = ({ context }, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const authorization = context.req.headers["authorization"];
        if (authorization) {
            const token = authorization.split(" ")[1];
            const payload = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET_KEY || 'mysecretkey');
            const user = yield user_1.User.findOne({ email: (_a = context.payload) === null || _a === void 0 ? void 0 : _a.email });
            context.payload = payload;
        }
    }
    catch (error) {
        console.log(error);
        throw error;
    }
    return next();
});
