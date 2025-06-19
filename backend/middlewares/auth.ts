import {Request, Response, NextFunction} from "express";
import jwt, {JsonWebTokenError, TokenExpiredError} from "jsonwebtoken";
import User from "../models/User";
import * as Type from "../types"
import {Error} from "mongoose";
require("dotenv").config();

export interface Req extends Request {
    user?: Type.User
}

const auth = async (req: Req, res: Response, next: NextFunction) => {
    try {
        const token = req.header('authorization')?.replace('Bearer ', '');

        if (!token) {
            res.status(401).json({
                ok: false,
                message: 'No token provided',
            });
            return;
        }

        if (!process.env.JWT_SECRET) {
            res.status(401).json({
                ok: false,
                message: 'Key not found',
            });
            return;
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET) as {id: string};
        } catch (err) {
            res.status(401).json({ok: false, message: "Invalid or expired token"});
            return;
        }

        const user = await User.findById(decoded.id);
        if (!user) {
            res.status(404).json({
                ok: false,
                message: 'User not found',
            });
            return;
        }
        req.user = user;
        next();
    } catch (error) {
        if (error instanceof TokenExpiredError) {
            res.status(401).json({
                ok: false,
                message: error.message,
            });
            return;
        }
        if (error instanceof JsonWebTokenError) {
            res.status(401).json({
                ok: false,
                message: error.message,
            });
            return;
        }

        res.status(500).json({
            ok: false,
            message: "Internal server error",
        });
        return;
    }
}

export default auth;