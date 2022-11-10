import { IUserAuthenticator } from "../contracts/interfaces/IAuthenticateUser";
import { IUserGetter } from "../contracts/interfaces/IUserGetter";
import { hashToBuffer } from "../scripts/hashtoBuffer"
import * as argon2 from "@node-rs/argon2";
import { Logger } from "pino"
import * as jwt from "jsonwebtoken";
import { validateEmail } from "../scripts/validateEmail"
import { IUserUpdater } from "../contracts/interfaces/IUserUpdater";
class UserAuthenticator implements IUserAuthenticator {

    private readonly _logger: Logger
    private readonly _userGetter: IUserGetter
    private readonly _userUpdater: IUserUpdater
    private readonly _accessSecret: jwt.Secret;
    private readonly _refreshSecret: jwt.Secret;
    private readonly _expiresIn: string;

    constructor(logger: Logger, userGetter: IUserGetter, userUpdater: IUserUpdater) {

        this._logger = logger;
        this._userGetter = userGetter;
        this._userUpdater = userUpdater;

        if (typeof process.env.JWT_ACCESS_SECRET !== "string" || typeof process.env.JWT_REFRESH_SECRET !== "string" || process.env.JWT_ACCESS_EXPIRATION !== "string") {
            const msg = "Access Secret, refresh secrets and/or expiration are not defined.\nAre you sure your env file is correct?";
            logger.error(msg);
            throw msg;
        }

        this._accessSecret = process.env.JWT_ACCESS_SECRET
        this._refreshSecret = process.env.JWT_REFRESH_SECRET
        this._expiresIn = process.env.JWT_ACCESS_EXPIRATION

    }

    private _generateRefreshToken(id: number, email: string): string {
        return jwt.sign({ id: id, email: email }, this._refreshSecret, { expiresIn: this._expiresIn });
    }

    private _generateAccessToken(id: number, email: string): string {
        return jwt.sign({ id: id, email: email }, this._accessSecret, { expiresIn: this._expiresIn });
    }

    async refreshAccessToken(token: string): Promise<string> {

        let msg: string;

        const jwtpayload = jwt.verify(token, this._refreshSecret);

        if (typeof jwtpayload !== 'object') {
            msg = "Issue reading JWT Payload"
            this._logger.error({ jwt: jwtpayload }, msg);
            throw msg;
        }

        const { id, email } = jwtpayload;

        const user = await this._userGetter.get(id);

        if (user === null) {
            msg = "User does not exists, cannot reissue token"
            this._logger.error({ jwt: jwtpayload }, msg);
            throw msg;
        }

        if (user.refresh_token !== token) {
            msg = "User token mismatch. Is your intent legit?"
            this._logger.error({ token: token }, msg);
            throw msg;
        }

        return this._generateAccessToken(id, email);

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

        const accessToken = this._generateAccessToken(user.id, user.email);
        const refreshToken = this._generateRefreshToken(user.id, user.email);

        await this._userUpdater.update(user.id, { refresh_token: refreshToken });

        return { access_token: accessToken, refresh_token: refreshToken };
    }

}

export { UserAuthenticator };