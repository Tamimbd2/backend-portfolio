"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../module/auth/user.model");
const seedAdmin = async () => {
    const isExists = await user_model_1.User.findOne({ email: process.env.ADMIN_EMAIL });
    if (isExists) {
        console.log("Admin already exists");
        return;
    }
    const admin = await user_model_1.User.create({
        name: "Mahabub Tamim",
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASSWORD,
    });
    console.log("admin create success", admin);
};
exports.default = seedAdmin;
