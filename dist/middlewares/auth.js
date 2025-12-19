"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = require("../module/auth/user.model");
const checkAuth = (...AuthRoutes) => async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            throw new Error("access token not found");
        }
        //  verify token 
        const verifyToken = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        const isExistUser = await user_model_1.User.findOne({ email: verifyToken.email });
        if (!isExistUser) {
            throw new Error("user not found !");
        }
        //  checking role
        if (!AuthRoutes.includes(verifyToken.role)) {
            throw new Error("you are not permeated to view this route !");
        }
        req.user = verifyToken;
        next();
    }
    catch (error) {
        next(error);
    }
};
exports.checkAuth = checkAuth;
