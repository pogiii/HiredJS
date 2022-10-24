import { IUserCreator } from "../contracts/interfaces/IUserCreator";
import { IUserCreatorRepositoryProvider } from "../contracts/interfaces/IUserCreatorRepositoryProvider";
import pino, { Logger } from "pino";
import { validateEmail } from "../scripts/validateEmail";
import { createHashFromString } from "../scripts/createHashFromString"
import { Hash } from "crypto";
import { UserCreatorRepositoryProvider } from "../providers/database/prisma/UserCreatorRepositoryProvider";
class UserCreator implements IUserCreator {

    private readonly _userCreatorRepositoryProvider: IUserCreatorRepositoryProvider;
    private readonly _logger: Logger;

    constructor(logger: Logger, userCreatorRepositoryProvider: IUserCreatorRepositoryProvider) {
        this._userCreatorRepositoryProvider = userCreatorRepositoryProvider;
        this._logger = logger;
    }

    async create(email: string, first_name: string, last_name: string, password: string): Promise<void> {
        if (!validateEmail(email) || email.length < 1) {
            const msg = "Email is not valid!";
            this._logger.error({}, msg);
            throw msg;
        }

        if (first_name.length < 1) {
            const msg = "First name is not valid!";
            this._logger.error({}, msg);
            throw msg;
        }

        if (last_name.length < 1) {
            const msg = "Last name is not valid!";
            this._logger.error({}, msg);
            throw msg;
        }

        if (password.length < 8) {
            const msg = "Password is not valid!";
            this._logger.error({}, msg);
            throw msg;
        }
    
        const {salt, hash} = await createHashFromString(password);

        await this._userCreatorRepositoryProvider.create(email, first_name, last_name, hash, salt)

    }

}

export { UserCreator };