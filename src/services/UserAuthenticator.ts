import { IUserAuthenticator } from "../contracts/interfaces/IAuthenticateUser";
import { IUserGetter } from "../contracts/interfaces/IUserGetter";
import { hashToBuffer } from "../scripts/hashtoBuffer"
import * as argon2 from "@node-rs/argon2";
import { Logger } from "pino"
import * as jwt from "jsonwebtoken";
import { validateEmail } from "../scripts/validateEmail"
class UserAuthenticator implements IUserAuthenticator {

    private readonly _logger: Logger
    private readonly _userGetter: IUserGetter
    private readonly _accessSecret: jwt.Secret;
    private readonly _refreshSecret: jwt.Secret;

    constructor(userGetter: IUserGetter, logger: Logger) {

        this._logger = logger;
        this._userGetter = userGetter;

        if (typeof process.env.JWT_ACCESS_SECRET !== "string" || typeof process.env.JWT_REFRESH_SECRET !== "string") {
            const msg = "Access Secret and/or refresh secrets are not defined.\nAre you sure your env file is correct?";
            logger.error(msg);
            throw msg;
        }

        this._accessSecret = process.env.JWT_ACCESS_SECRET
        this._refreshSecret = process.env.JWT_REFRESH_SECRET

    }

    async authenticate(email: string, password: string): Promise<{ refresh_token?: string; access_token?: string; }> {

        let msg: string;

        if (!validateEmail(email)) {
            msg = "Email is not valid."
            this._logger.error({ email: email }, msg)
            throw msg;
        }

        const user = await this._userGetter.getByEmail(email);

        if (user === null) {
            msg = "User does not exists."
            this._logger.error({ email: email }, msg)
            throw msg;
        }

        // Verify user password.
        const isOK = await argon2.verify(user.password_hash, password, { secret: hashToBuffer(user.salt) });

        if (!isOK) {
            msg = "Password is incorrect";
            this._logger.error({ email: email }, msg);
            throw msg;
        }

        const accessToken = jwt.sign(user, this._accessSecret);

        return { access_token: accessToken };
    }

}

export { UserAuthenticator };