import { NextFunction, Request, Response } from "express";
import { User } from "./user.model";
import jwt from "jsonwebtoken"

const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;

        console.log(req.body);

        const user = await User.findOne({ email });

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
        };


        // generate token
        const token = jwt.sign({
            id: user._id,
            email: user.email,
            role: user.role,
        }, process.env.JWT_SECRET as string, {
            expiresIn: "1d"
        });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        })

        res.status(200).json({
            success: true,
            data: user,
            token: token
        });
    }
    catch (error) {
        next(error)
    }
}



export const AuthController = {
    login
}




