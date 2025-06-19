import {Request, Response, NextFunction} from "express";
import {Req} from "./auth";

const permit = (...roles: string[]) => {
    return (expressReq: Request, res: Response, next: NextFunction) => {
        const req = expressReq as Req;

        if (!req.user) {
            res.status(401).json({
                ok: false,
                message: 'Not authorized',
            });
            return;
        }

        if (!roles.includes(req.user.role)) {
            res.status(403).json({
                ok: false,
                message: 'Access denied',
            });
            return;
        }

        next();
    }
}

export default permit;