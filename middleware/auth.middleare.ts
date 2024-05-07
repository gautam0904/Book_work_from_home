import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "../constant/constat";

declare global {
    namespace Express {
        interface Request {
            decoded?: jwt.JwtPayload;
            accessToken?: string;
        }
    }
}

export const authmiddle = async (req: Request, res: Response, next: NextFunction) => {
    const AccessToken = req.headers.access_token

    if (!AccessToken) {
        return res.status(401).json({
            message: "You have not token"
        });
    }
    const accesstoken = (AccessToken as string).split(" ")[1];
    jwt.verify(accesstoken, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                message: "You are not authorized",
                err
            })
        }
        else {
            (req as jwt.JwtPayload).decoded = decoded;
            next();
        }
    });
};



