import express from "express";
import * as jwt from "jsonwebtoken";
import { Request } from "../contracts/entities/Request";
function authenticateToken(req: Request, res: express.Response, next: express.NextFunction) {

    const accessSecret = process.env.JWT_ACCESS_SECRET;
    if (typeof accessSecret !== "string") {
        const msg = "Access Secret and/or refresh secrets are not defined.\nAre you sure your env file is correct?";
        throw msg;
    }

    const authorizationHeader = req.headers["authorization"];
    const token = authorizationHeader && authorizationHeader.split(" ")[1];

    if (typeof token !== "string") return res.sendStatus(401);

    jwt.verify(token, accessSecret, (err, user) => {

        if (err) return res.sendStatus(403);

        req.user = user;

        next();
    })

}

export { authenticateToken };