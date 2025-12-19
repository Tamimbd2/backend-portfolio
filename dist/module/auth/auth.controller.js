"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const user_model_1 = require("./user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        console.log(req.body);
        const user = await user_model_1.User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        if (user.password !== password) {
            return res.status(401).json({
                success: false,
                message: "Invalid password",
            });
        }
        ;
        // generate token
        const token = jsonwebtoken_1.default.sign({
            id: user._id,
            email: user.email,
            role: user.role,
        }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        });
        res.status(200).json({
            success: true,
            data: user,
            token: token
        });
    }
    catch (error) {
        next(error);
    }
};
exports.AuthController = {
    login
};
