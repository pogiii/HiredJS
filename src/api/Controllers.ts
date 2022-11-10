import express, { Router } from "express";
import { Logger } from "pino";
import { IUserAuthenticator } from "../contracts/interfaces/IAuthenticateUser";

class Controllers {

    private readonly _router = Router();

    // dependencies
    private readonly _logger: Logger
    private readonly _userAuthenticator: IUserAuthenticator

    constructor(logger: Logger, userAuthenticator: IUserAuthenticator) {
        this._logger = logger;
        this._userAuthenticator = userAuthenticator
    }

    private _defineControllers() {

        this._router.post("/authenticate", (req: express.Request, res: express.Response) => {
            this._logger.info(req.body, `${req.body.email} is attempting to authenticate.`);

            if (typeof req.body.email !== "string" || typeof req.body.password !== "string") {
                res.sendStatus(400);
                return;
            }

            this._userAuthenticator.authenticate(req.body.email, req.body.password)
                .then(data => {
                    res.sendStatus(200);
                    res.json(data);
                });
        })

        this._router.post("/refresh", (req: express.Request, res: express.Response) => {
            this._logger.info(`Refreshing access token with refresh token: ${req.body.token}`);

            if (typeof req.body.token !== "string") {
                res.sendStatus(400);
                return;
            }

            this._userAuthenticator.refreshAccessToken(req.body.token)
                .then(data => {
                    res.sendStatus(200);
                    res.json({ access_token: data });
                })

        })

    }

    public getControllers(): Router {
        this._defineControllers();
        return this._router
    }

}

export { Controllers };