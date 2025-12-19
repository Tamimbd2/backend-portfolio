import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"
import { User } from "../module/auth/user.model";




export const checkAuth = (...AuthRoutes: string[]) => async (req: Request & { user: any }, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            throw new Error("access token not found")
        }

        //  verify token 
        const verifyToken = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

        const isExistUser = await User.findOne({ email: verifyToken.email });

        if (!isExistUser) {
            throw new Error("user not found !")
        }

        //  checking role
        if (!AuthRoutes.includes(verifyToken.role)) {
            throw new Error("you are not permeated to view this route !")
        }

        req.user = verifyToken;
        next()

    } catch (error) {
        next(error)
    }



}