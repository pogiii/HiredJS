import { IUserAuthenticator } from "../contracts/interfaces/IAuthenticateUser";
import { IUserGetter } from "../contracts/interfaces/IUserGetter";
import { hashToBuffer } from "../scripts/hashtoBuffer"
import { createHashFromString } from "../scripts/createHashFromString"
import { Logger } from "pino"
class UserAuthenticator implements IUserAuthenticator {

    private readonly _logger: Logger
    private readonly _userGetter: IUserGetter

    constructor(userGetter: IUserGetter, logger: Logger) {

        this._logger = logger;
        this._userGetter = userGetter;

    }

    async authenticate(email, password): Promise<{ refresh_token?: string; access_token?: string;}> {

        let msg: string;

        const user = await this._userGetter.getByEmail(email);

        if (user === null) {
            msg = "User does not exists."
            this._logger.error({email:email}, msg)
            throw msg;
        }

        // If user exists check if password matches using a hash.
        const secret = hashToBuffer(user.salt);
        const hashed = await createHashFromString(password, secret);

        if (hashed.hash !== user.password_hash) {
            msg = "User passwords does not match."
            this._logger.error({email:email, saved: user.password_hash, received: hashed.hash}, msg);
            throw msg;
        }

        // TODO: intergrate with JWT.
        return {};
    }

}